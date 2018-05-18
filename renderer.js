const {ipcRenderer} = require('electron')

//Send Message
ipcRenderer.send('channel1', 'Hello From Renderer')

ipcRenderer.on('channel1', (e,args) => {
  console.log(args)
})

ipcRenderer.on('private', (e,args) => {
  console.log(args)
})

//Shared Main Process and Renderer
// https://electronjs.org/docs/api/process
console.log(`Process Type: ${process.type}`)
console.log(`Electron Version: ${process.versions.electron}`)
console.log(`Chrome (Chromium) Version: ${process.versions.chrome}`)
console.log(`Resource Path: ${process.resourcesPath}`)

// Get All Displays and Size
// https://electronjs.org/docs/api/screen
const electron = require('electron')
const display = electron.screen.getAllDisplays();
for(let key in display){
  console.log(display[key].size.width,display[key].size.height)
  console.log(display[key].bounds.x, display[key].bounds.y) // Main Monitor will always have bound  0,0 for multiple monitors this will allow us to knw the layout of the monitors
}
/////
