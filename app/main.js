const {app, autoUpdater, BrowserWindow} = require('electron');

let win;

const feedURL = "https://squirrel-electron-update.herokuapp.com/download";

if (process.platform === "win32") {
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
