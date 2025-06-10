import { BrowserWindow } from "electron"
import { IpcHandler } from "../core/ipcHandler.ts"
import { indexHtml, loadingHtml, preloadPath, VITE_DEV_SERVER_URL } from "../utils/constants.ts"
import { StoreManager } from "./storeManager.ts"

export class WindowManager {
  private windows = new Map<string, BrowserWindow>()
  private handler: IpcHandler
  private themeStore: StoreManager<ThemeStore>

  constructor(handler: IpcHandler, theme: StoreManager<ThemeStore>) {
    this.handler = handler
    this.themeStore = theme
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

    this.handler.handle("window:isMaximized", (event) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) return
      return win.isMaximized()
    })

    this.handler.handle("window:isMinimized", (event) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) return
      return win.isMinimized()
    })

    this.handler.on("window:close", (event) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) return
      win.close()
    })
  }

  private loadTarget = (win: BrowserWindow, url?: string, path?: string) => {
    if (url) return win.loadURL(url)
    if (path) return win.loadFile(path)
    if (VITE_DEV_SERVER_URL) return win.loadURL(VITE_DEV_SERVER_URL)
    return win.loadFile(indexHtml)
  }

  private setLoading = (options: Electron.BrowserWindowConstructorOptions) => {
    const loadingWindow = new BrowserWindow({
      ...options,
      webPreferences: {
        preload: preloadPath,
        contextIsolation: true,
        nodeIntegration: false,
        ...options.webPreferences,
      },
    })
    loadingWindow.loadFile(loadingHtml).then()
    loadingWindow.webContents
      .executeJavaScript(
        `
    document.documentElement.style.setProperty('--color-bg', '${this.themeStore.get("backgroundColor")}');
    document.documentElement.style.setProperty('--color-primary', '${this.themeStore.get("primaryColor")}');
  `
      )
      .then()

    return loadingWindow
  }

  createWindow({ key, options, url, path }: WindowOptions): BrowserWindow {
    if (this.windows.has(key)) {
      return this.windows.get(key)!
    }

    const loadingWindow = this.setLoading(options)
    const win = new BrowserWindow({
      ...options,
      show: false,
      webPreferences: {
        preload: preloadPath,
        contextIsolation: true,
        nodeIntegration: false,
        ...options.webPreferences,
      },
    })

    win.webContents.on("did-finish-load", () => {
      setTimeout(() => {
        if (loadingWindow.isDestroyed()) return
        loadingWindow.close()
        win.show()
      }, 500)
    })

    this.loadTarget(win, url, path).then()

    this.windows.set(key, win)

    win.on("closed", () => {
      this.windows.delete(key)
    })

    win.on("maximize", () => {
      win.webContents.send("window:isMaximize")
    })

    win.on("unmaximize", () => {
      win.webContents.send("window:isUnmaximize")
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
