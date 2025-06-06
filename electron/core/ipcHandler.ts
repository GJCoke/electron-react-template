import { ipcMain } from "electron"
import { Logger } from "../utils/logger"

const logger = new Logger("IPCHandler")

type IpcOnCallback<TArgs extends unknown[] = unknown[]> = (event: Electron.IpcMainEvent, ...args: TArgs) => void

type IpcHandleCallback<TArgs extends unknown[] = unknown[], TResult = unknown> = (
  event: Electron.IpcMainInvokeEvent,
  ...args: TArgs
) => TResult

export class IpcHandler {
  handle<TArgs extends unknown[], TResult>(channel: string, listener: IpcHandleCallback<TArgs, TResult>) {
    logger.debug(`Electron handler registered for channel: ${channel}`)
    ipcMain.handle(channel, async (event, ...args) => {
      try {
        return await listener(event, ...(args as TArgs))
      } catch (error) {
        logger.error(`IPC Handle Error [${channel}]:`, error)
        throw error
      }
    })
  }

  unHandle(channel: string) {
    ipcMain.removeHandler(channel)
  }

  on<TArgs extends unknown[]>(channel: string, listener: IpcOnCallback<TArgs>) {
    logger.debug(`Electron listener registered for channel: ${channel}`)
    ipcMain.on(channel, (event, ...args) => {
      try {
        listener(event, ...(args as TArgs))
      } catch (error) {
        logger.error(`IPC On Error [${channel}]:`, error)
      }
    })
  }

  off(channel: string, listener: IpcHandleCallback) {
    ipcMain.removeListener(channel, listener)
  }
}
