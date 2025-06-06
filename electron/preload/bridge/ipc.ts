import { ipcRenderer } from "electron"

export const ipcBridge = {
  ping: (): Promise<string> => ipcRenderer.invoke("ping"),
}
