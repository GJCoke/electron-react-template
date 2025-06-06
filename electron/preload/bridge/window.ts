import { ipcRenderer } from "electron"

export const windowBridge = {
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  toggleMaximize: () => ipcRenderer.send("window:toggleMaximize"),
  close: () => ipcRenderer.send("window:close"),
}
