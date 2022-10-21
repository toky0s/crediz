import { app, BrowserWindow, ipcMain } from 'electron';

import { createConnection } from 'typeorm';
const url = require("url");
const path = require("path");

let mainWindow: BrowserWindow | null;

const params: string[] = process.argv;
const isDev: boolean = params[0].includes("electron");

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({requestHeaders: {Origin: '*', ...details.requestHeaders}});
    }
  )

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        'Access-Control-Allow-Origin': ['*'],
        'Access-Control-Allow-Headers': ['*'],
        ...details.responseHeaders,
      },
    });
  });
  
  if (isDev) {
    mainWindow.loadURL("http://localhost:4200/");
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/crediz/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
  }
  
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', createWindow);

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});
