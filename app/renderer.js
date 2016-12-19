const {ipcRenderer} = require('electron');

setInterval(() => {
  let val = ipcRenderer.sendSync('getStatus');
  document.getElementById('status').innerHTML = val;
}, 1000);
