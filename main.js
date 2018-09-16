var { app, shell, BrowserWindow, Menu, ipcMain } = require('electron');
var join = require('path').join;
const basepath = app.getAppPath();

var processManager  = require('electron-process-manager');
const defaultMenu = require('electron-default-menu');

processManager.on('killed-process', pid => console.log('Killed process', pid));

app.once('window-all-closed',function() { app.quit(); });

app.once('ready', function() {

  processManager.open({
    defaultSorting: {
      path: 'cpu.percentCPUUsage',
      how: 'descending'
    }});
});

if (process.env.TEST_PROCESS_MANAGER) {
  // emulate click on menu item
  ipcMain.on('open-process-manager', () => processManager.open());

  process.on('uncaughtException', function (error) {
    console.error(error, error.stack);
    process.exit(1);
  });

}
