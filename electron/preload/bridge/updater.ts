import { ipcRenderer, IpcRendererEvent } from "electron"

export const updaterBridge = {
  onUpdateAvailable: (cb: Callback<UpdateInfo>) => {
    ipcRenderer.on("update:available", (_: IpcRendererEvent, info: UpdateInfo) => cb(info))
  },

  onDownloaded: (cb: Callback<UpdateInfo>) => {
    ipcRenderer.on("update:downloaded", (_: IpcRendererEvent, info: UpdateInfo) => cb(info))
  },

  onUpdateNotAvailable: (cb: Callback<void>) => {
    ipcRenderer.on("update:not-available", () => cb())
  },

  onUpdateError: (cb: Callback<string>) => {
    ipcRenderer.on("update:error", (_, error: string) => cb(error))
  },

  onUpdateProgress: (cb: Callback<number>) => {
    ipcRenderer.on("update:progress", (_, percent) => cb(percent))
  },

  installUpdate: () => {
    ipcRenderer.send("update:install")
  },

  updateReady: () => {
    ipcRenderer.send("update:ready")
  },
}
