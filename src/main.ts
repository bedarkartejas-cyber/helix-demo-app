import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';
import { 
  setupDatabase, 
  seedDatabase, 
  getProducts, 
  getRecommendations, 
  getProductById 
} from './database/model';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// --- FIX: Declare Vite constants so TypeScript doesn't complain ---
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

const createWindow = () => {
  // Create the browser window.
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // --- FIX: Use Vite variables instead of Webpack ---
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(async () => {
  // 1. Initialize Database
  try {
    const db = await setupDatabase();
    console.log("Database initialized.");
    
    // Seed it (This runs your 'Clear Old Data' logic)
    seedDatabase(db);
    console.log("Database seeded.");
  } catch (err) {
    console.error("Failed to setup database:", err);
  }

  // 2. Register API Handlers
  ipcMain.handle('get-products', (_event, personaId?: string) => {
    try {
      return getProducts(personaId);
    } catch (error) {
      console.error('Failed to get products:', error);
      return [];
    }
  });

  ipcMain.handle('get-recommendations', (_event, answers: Record<string, string>) => {
    try {
      return getRecommendations(answers);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      return [];
    }
  });

  // --- HANDLER FOR PRODUCT DETAIL ---
  ipcMain.handle('get-product-by-id', (_event, productId: string) => {
    try {
      return getProductById(productId);
    } catch (error) {
      console.error('Failed to get product detail:', error);
      return null;
    }
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});