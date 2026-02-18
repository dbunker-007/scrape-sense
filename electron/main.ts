import { app, BrowserWindow } from "electron";
import path from "node:path";
import { spawn } from "node:child_process";

let mainWindow: BrowserWindow | null = null;
let backendProcess: any = null;

const BACKEND_PORT = 3333;

function startBackend() {
  const python = process.platform === "win32" ? "python" : "python3";

  backendProcess = spawn(python, ["backend/run.py"], {
    cwd: path.join(__dirname, "..", ".."),
    stdio: "inherit"
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // DEV: React dev server
  mainWindow.loadURL("http://localhost:5173");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== "darwin") app.quit();
});
