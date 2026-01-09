import { app, BrowserWindow, ipcMain, screen } from "electron";
import fs from "fs";
import path from "path";
import started from "electron-squirrel-startup";
import {
    setupDatabase,
    seedDatabase,
    getProducts,
    getRecommendations,
    getProductById,
} from "./database/model";

// Create a log file in userData
const logPath = path.join(app.getPath("userData"), "app.log");
const logStream = fs.createWriteStream(logPath, { flags: "a" });

// Override console.log to also write to file
const originalLog = console.log;
console.log = (...args) => {
    const message = args
        .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" ");
    logStream.write(`${new Date().toISOString()} - ${message}\n`);
    originalLog(...args);
};

console.error = (...args) => {
    const message = args
        .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" ");
    logStream.write(`${new Date().toISOString()} - ERROR: ${message}\n`);
    originalLog(...args);
};

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
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // --- FIX: Use Vite variables instead of Webpack ---
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            path.join(
                __dirname,
                `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
            )
        );
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

app.whenReady().then(async () => {
    // 1. Initialize Database
    try {
        console.log("Initializing Database.");
        const db = await setupDatabase();
        console.log("Database initialized.");

        // Seed it (This runs your 'Clear Old Data' logic)
        const result = db.exec("SELECT COUNT(*) as count FROM products");
        const productCount = result[0]?.values[0][0] || 0;

        if (productCount === 0) {
            console.log("Seeding Database.");
            seedDatabase(db);
            console.log("Database seeded successfully.");
        } else {
            console.log("Database already contains data. Skipping seed.");
        }
    } catch (err) {
        console.error("Failed to setup database:", err);
        app.quit();
        return;
    }

    // 2. Register API Handlers
    ipcMain.handle("get-products", (_event, personaId?: string) => {
        try {
            return getProducts(personaId);
        } catch (error) {
            console.error("Failed to get products:", error);
            return [];
        }
    });

    ipcMain.handle(
        "get-recommendations",
        (_event, answers: Record<string, string>) => {
            try {
                return getRecommendations(answers);
            } catch (error) {
                console.error("Failed to get recommendations:", error);
                return [];
            }
        }
    );

    // --- HANDLER FOR PRODUCT DETAIL ---
    ipcMain.handle("get-product-by-id", (_event, productId: string) => {
        try {
            return getProductById(productId);
        } catch (error) {
            console.error("Failed to get product detail:", error);
            return null;
        }
    });

    ipcMain.handle("reset-database", async () => {
        try {
            console.log("Manually resetting database...");
            const db = await setupDatabase();

            // Clear existing data
            db.run("DELETE FROM product_specs");
            db.run("DELETE FROM product_media");
            db.run("DELETE FROM products");
            db.run("DELETE FROM personas");

            // Re-seed
            seedDatabase(db);
            console.log("Database reset complete.");
            return { success: true };
        } catch (error) {
            console.error("Failed to reset database:", error);
            return { success: false, error: String(error) };
        }
    });

    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
