const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
/*
contextBridge.exposeInMainWorld('electron', {
  homeDir: () => os.homedir(),
  osVersion: () => os.arch(),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
});
*/
contextBridge.exposeInMainWorld('connection', {
  getData: (table) => ipcRenderer.invoke('get-data', table),
  createData: (name) => ipcRenderer.invoke('create-data', name),
});