import { ipcRenderer } from "electron"

export const ipcBridge = {
  platform: (): Promise<string> => ipcRenderer.invoke("platform"),
}
