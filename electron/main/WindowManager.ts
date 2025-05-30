import { BrowserWindow } from "electron"
import { join } from "path"
import { fileURLToPath } from "url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface WindowOptions {
  key: string
  options: Electron.BrowserWindowConstructorOptions
  url?: string
}

export class WindowManager {
  private windows = new Map<string, BrowserWindow>()

  createWindow({ key, options, url }: WindowOptions): BrowserWindow {
    if (this.windows.has(key)) {
      return this.windows.get(key)!
    }

    const win = new BrowserWindow({
      ...options,
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        contextIsolation: true,
        nodeIntegration: false,
        ...options.webPreferences,
      },
    })

    const loadURL = url ?? "http://localhost:5173"
    win.loadURL(loadURL).then(() => {})

    this.windows.set(key, win)

    win.on("closed", () => {
      this.windows.delete(key)
    })

    return win
  }

  getWindow(key: string): BrowserWindow | undefined {
    return this.windows.get(key)
  }

  minimize(key: string) {
    const win = this.windows.get(key)
    if (win && !win.isMinimized()) {
      win.minimize()
    }
  }

  maximize(key: string) {
    const win = this.windows.get(key)
    if (win && !win.isMaximized()) {
      win.maximize()
    }
  }

  restore(key: string) {
    const win = this.windows.get(key)
    if (win && win.isMinimized()) {
      win.restore()
    } else if (win?.isMaximized()) {
      win.unmaximize()
    }
  }

  toggleMaximize(key: string) {
    const win = this.windows.get(key)
    if (!win) return
    win.isMaximized() ? win.unmaximize() : win.maximize()
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
