import { BrowserWindow } from "electron"
import { IpcHandler } from "../core/ipcHandler.ts"
import { indexHtml, preloadPath, VITE_DEV_SERVER_URL } from "../utils/constants.ts"

export class WindowManager {
  private windows = new Map<string, BrowserWindow>()
  private handler: IpcHandler

  constructor(handler: IpcHandler) {
    this.handler = handler
    this.registerEvents()
  }

  private registerEvents() {
    this.handler.on("window:maximize", (event) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (win && !win.isMaximized()) {
        win.maximize()
      }
    })

    this.handler.on("window:minimize", (event) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (win && !win.isMinimized()) {
        win.minimize()
      }
    })

    this.handler.on("window:toggleMaximize", (event) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) return
      win.isMaximized() ? win.unmaximize() : win.maximize()
    })
  }

  createWindow({ key, options, url }: WindowOptions): BrowserWindow {
    if (this.windows.has(key)) {
      return this.windows.get(key)!
    }

    const win = new BrowserWindow({
      ...options,
      webPreferences: {
        preload: preloadPath,
        contextIsolation: true,
        nodeIntegration: false,
        ...options.webPreferences,
      },
    })
    if (url) {
      win.loadURL(url).then()
    } else if (VITE_DEV_SERVER_URL) {
      win.loadURL(VITE_DEV_SERVER_URL).then()
    } else {
      win.loadFile(indexHtml).then()
    }

    this.windows.set(key, win)

    win.on("closed", () => {
      this.windows.delete(key)
    })

    return win
  }

  getWindow(key: string): BrowserWindow | undefined {
    return this.windows.get(key)
  }

  restore(key: string) {
    const win = this.windows.get(key)
    if (win && win.isMinimized()) {
      win.restore()
    } else if (win?.isMaximized()) {
      win.unmaximize()
    }
  }

  close(key: string) {
    const win = this.windows.get(key)
    win?.close()
  }

  closeAll() {
    this.windows.forEach((win) => win.close())
    this.windows.clear()
  }
}
