const electron = require('electron')
const { app, BrowserWindow, globalShortcut, Menu, MenuItem, ipcMain } = electron
const path = require('path')
const url = require('url')
const windowStateKeeper = require('electron-window-state')
const mainWindow = require('./electron/mainWindow')
let mainMenu = Menu.buildFromTemplate( require('./menu/mainMenu.js'))

// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// });

app.on('ready', (e) => {
  mainWindow.createWindow();
  Menu.setApplicationMenu(mainMenu);
  initializeGlobalShortcut();

})

app.on('before-quit', (e) => {
  console.log('App about to quit, do stuff before app quits')
})

app.on('browser-window-blur', (e) => {
  console.log('Window out of focus')
})

app.on('browser-window-focus', (e) => {
  console.log('Window in focus')
})

app.on('window-all-closed', (e) => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', (e) => {
  if (mainWindow === null) {
    mainWindow.createMainWindow()
  }
})

function initializeGlobalShortcut(){
  globalShortcut.register('CommandOrControl+g', () => {
    console.log('User Pressed CommandOrControl + g')
  })
}

// console.log('Get User Data: ', app.getPath('userData')); // Store User Data
// console.log('Get Name: ', app.getName());
// console.log('Get App Version: ', app.getVersion());
// app.setName("Sample Electron Application");
// console.log('Get Name: ', app.getName());
// app.setBadgeCount(22); // Mac Only
// ipcMain.on('channel1', (e, args) => {
//   console.log(args)
//   e.sender.send('channel1', "Message was received by the main process")
// })
