import { ipcRenderer } from "electron"

export const windowBridge = {
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  toggleMaximize: () => ipcRenderer.send("window:toggleMaximize"),
  isMaximized: (): Promise<boolean> => ipcRenderer.invoke("window:isMaximized"),
  isMinimized: (): Promise<boolean> => ipcRenderer.invoke("window:isMinimized"),
  close: () => ipcRenderer.send("window:close"),
  onMaximize: (callback: () => void) => {
    ipcRenderer.on("window:isMaximize", () => {
      callback()
    })
  },
  onUnmaximize: (callback: () => void) => {
    ipcRenderer.on("window:isUnmaximize", () => {
      callback()
    })
  }
}
