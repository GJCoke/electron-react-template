import { ipcMain } from "electron"

type IpcCallback = (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any

export class IpcHandler {
  register(channel: string, handler: IpcCallback) {
    ipcMain.handle(channel, async (event, ...args) => {
      try {
        return await handler(event, ...args)
      } catch (error) {
        console.error(`IPC Error [${channel}]:`, error)
        throw error
      }
    })
  }

  unregister(channel: string) {
    ipcMain.removeHandler(channel)
  }
}
