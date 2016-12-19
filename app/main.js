const {app, autoUpdater, BrowserWindow, ipcMain} = require('electron');
const os = require('os');

console.log(app.getVersion());
let win;

let feedURL;
if (process.platform === "win32") {
  feedURL = "https://squirrel-electron-update.herokuapp.com/update/win32/" + app.getVersion();
} else if (process.platform === "darwin") {
  feedURL = "https://squirrel-electron-update.herokuapp.com/update/darwin_x64/" + app.getVersion();
}
console.log("URL: ", feedURL);

let status = "unknown";
if (feedURL) {
  autoUpdater.setFeedURL(feedURL);
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-download', () => {
    console.log('found update!');
    status = "update-download";
  });
  autoUpdater.on('update-not-available', () => {
    console.log('not found...');
    status = 'update-not-available';
  });

  autoUpdater.on('error', () => {
    console.log('error');
    status = 'error';
  });
}


app.on('ready', () => {

  ipcMain.on('getStatus', (e) => {
    e.returnValue = status;
  });

  win = new BrowserWindow();
  win.loadURL('file://' + __dirname + '/index.html');
});
