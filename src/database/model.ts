import initSqlJs from 'sql.js';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';

// 1. Path determination remains the same
const dbPath = app.isPackaged 
  ? path.join(app.getPath('userData'), 'v5_retail.db') 
  : 'v5_retail.db';

let dbInstance: initSqlJs.Database; // Declare dbInstance with the correct type

/**
 * Saves the in-memory database back to the physical disk.
 * Critical for 'sql.js' because changes stay in RAM until exported.
 */
function persistToDisk(db: initSqlJs.Database) { // Accept db as an argument
  const data = db.export(); // Use the passed db argument
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

export async function setupDatabase() {
  // Load the WASM engine
  const SQL = await initSqlJs({
    // Point to the local wasm file.
    locateFile: (file) => {
      return app.isPackaged
        ? path.join(process.resourcesPath, file)
        : path.join(__dirname, '../../node_modules/sql.js/dist', file);
    }
  });

  // Load existing data if it exists, otherwise create new
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    dbInstance = new SQL.Database(fileBuffer); // Use dbInstance consistently
  } else { // If database file doesn't exist, create a new in-memory database
    dbInstance = new SQL.Database();
  }

  // 3. Create tables only if they are missing
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS personas ( 
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        screensaver_path TEXT,
        theme_color TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        model_name TEXT NOT NULL,
        persona_id TEXT,
        hero_description TEXT, 
        is_featured INTEGER DEFAULT 0,
        FOREIGN KEY (persona_id) REFERENCES personas(id)
    );

    CREATE TABLE IF NOT EXISTS product_media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT,
        media_type TEXT,
        file_path TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
        is_hero_media INTEGER DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS product_specs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT,
        label TEXT,
        human_value TEXT,
        tech_value TEXT,
        icon_name TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  persistToDisk(dbInstance); // Pass dbInstance to persistToDisk
  console.log(`sql.js initialized at: ${dbPath}`);
  return dbInstance; // Return the initialized database instance
}

export function seedDatabase(db: initSqlJs.Database) { // Accept the database instance as an argument
  // Note: sql.js does not support .pragma() via helper methods, use .run()
  db.run('PRAGMA foreign_keys = ON');

  // Insert Personas
  const personas = [
    ['gaming', 'Gaming', 'media/screensavers/gaming_helix.mp4', '#FF4500'],
    ['creator', 'Creator', 'media/screensavers/creator_helix.mp4', '#9333EA'],
    ['office', 'Office', 'media/screensavers/office_helix.mp4', '#2563EB'],
    ['student', 'Student', 'media/screensavers/student_helix.mp4', '#10B981']
  ];

  personas.forEach(p => {
    db.run(`INSERT OR IGNORE INTO personas (id, name, screensaver_path, theme_color) VALUES (?, ?, ?, ?)`, p);
  });

  // Insert Products [cite: 14]
  const allProducts = [
    ['omen-17', 'OMEN 17', 'gaming', 'Desktop-class power in a portable form factor.'],
    ['spectre-16', 'Spectre x360 16', 'creator', 'A 16-inch canvas for your biggest creative ideas.'],
    ['elitebook-840', 'EliteBook 840 G10', 'office', 'The corporate standard for security and performance.'],
    ['pavilion-14-std', 'Pavilion Plus 14', 'student', 'The all-day companion for lectures and late-night study.']
  ];

  allProducts.forEach(p => {
    db.run(`INSERT OR IGNORE INTO products (id, model_name, persona_id, hero_description) VALUES (?, ?, ?, ?)`, p);
  });

  // Insert Human-Centric Specs [cite: 4, 20]
  const allSpecs = [
    ['omen-17', 'Performance', 'Crush AAA titles with pro-level frame rates.', 'GiRocket'],
    ['spectre-16', 'Display', 'Vibrant OLED touch screen with pro-grade color accuracy.', 'FiEdit'],
    ['elitebook-840', 'Collaboration', 'AI-enhanced video and audio for crystal-clear calls.', 'FiUsers'],
    ['pavilion-14-std', 'Battery', 'Lasts through your longest school day on one charge.', 'FiBattery']
  ];

  allSpecs.forEach(s => {
    db.run(`INSERT OR IGNORE INTO product_specs (product_id, label, human_value, icon_name) VALUES (?, ?, ?, ?)`, s);
  });

  // Save changes from RAM to Disk
  persistToDisk(db); // Pass the db argument to persistToDisk
  console.log("Database seeded successfully via sql.js");
}