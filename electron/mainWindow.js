const { BrowserWindow, session, Menu } = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const url = require('url')
let contextMenu = Menu.buildFromTemplate( require('../menu/contextMenu.js'))

exports.win

exports.createWindow = () => {
  let appSession = session.fromPartition('persist:appSession')

  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })
  this.win = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    show: true,
    minWidth: 800,
    minHeight: 600
  })
  mainWindowState.manage(this.win);

  this.win.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))

  this.win.on('closed', () => {
    this.win = null
  })

  let mainContents = this.win.webContents

  mainContents.on('context-menu', (e) => {
    e.preventDefault()
    contextMenu.popup(this.win)
  })

  mainContents.on('did-finish-load', () =>{
    mainContents.send('private', "Message From Main Process to Main Window")
  })

}
