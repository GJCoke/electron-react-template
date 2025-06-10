import { ipcRenderer } from "electron"

export const storeBridge = {
  get: (key: string) => ipcRenderer.invoke("store:get", key),
  set: (key: string, value: StoreType) => ipcRenderer.invoke("store:set", key, value),
  delete: (key: string) => ipcRenderer.invoke("store:delete", key),
  clear: () => ipcRenderer.invoke("store:clear"),
  themeSet: (key: keyof ThemeStore, value: StoreType) => ipcRenderer.invoke("theme:set", key, value),
}
