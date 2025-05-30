import { ipcMain } from "electron"

type IpcCallback<TArgs extends unknown[] = unknown[], TResult = unknown> =
  (event: Electron.IpcMainInvokeEvent, ...args: TArgs) => TResult

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

  on(channel: string, listener: IpcCallback) {
    ipcMain.on(channel, (event, ...args) => {
      try {
        listener(event, ...args)
      } catch (error) {
        console.error(`IPC On Error [${channel}]:`, error)
      }
    })
  }

  off(channel: string, listener: IpcCallback) {
    ipcMain.removeListener(channel, listener)
  }
}
