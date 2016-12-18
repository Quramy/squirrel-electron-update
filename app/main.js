const {app, autoUpdater, BrowserWindow} = require('electron');
const os = require('os');

console.log(app.getVersion());
let win;

if (process.platform === "win32") {
  const feedURL = "https://squirrel-electron-update.herokuapp.com/update/win32/" + app.getVersion();
  autoUpdater.setFeedURL(feedURL);
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-download', () => {
    console.log('found update!');
  });
  autoUpdater.on('update-not-available', () => {
    console.log('not found...');
  });

  autoUpdater.on('error', () => {
    console.log('error');
  });
}

app.on('ready', () => {
  win = new BrowserWindow();
  win.loadURL('file://' + __dirname + '/index.html');
});
