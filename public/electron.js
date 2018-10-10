const electron = require('electron');

const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let imageWindow;
let settingsWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      webSecurity: false
    }
  });

  //调试
  // mainWindow.webContents.openDevTools()


  imageWindow = new BrowserWindow({
    width: 1024,
    height: 681,
    parent: mainWindow,
    show: false
  });

  imageWindow.webContents.openDevTools()


  settingsWindow = new BrowserWindow({
    width: 200,
    height: 600,
    parent: mainWindow,
    show: false
  });


  console.log(path.join(__dirname, '../build/index.html'));

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  imageWindow.loadURL(isDev ? 'http://localhost:3000/#/image' : `file://${path.join(__dirname, '../build/index.html#image')}`);
  settingsWindow.loadURL(isDev ? 'http://localhost:3000/#/settings' : `file://${path.join(__dirname, '../build/index.html#/settings')}`);


  mainWindow.on('closed', () => mainWindow = null);

  imageWindow.on('close', (e) => {
    e.preventDefault();
    imageWindow.hide();
  });

  settingsWindow.on('close', (e) => {
    e.preventDefault();
    settingsWindow.hide();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('toggle-image', (event, arg) => {
  imageWindow.show();
  imageWindow.webContents.send('image', arg);
})

ipcMain.on('toggle-settings', () => {
  settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show();
})


ipcMain.on('close-main', (event, arg) => {

  // app.quit();
  mainWindow.close();

})

/**
 * windows上用
 */
//if (require('electron-squirrel-startup')) return;