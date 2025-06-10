import { app, BrowserWindow, screen, shell } from "electron"
import { IpcHandler } from "./ipcHandler"
import { WindowManager } from "../manager/windowManager"
import { Logger } from "../utils/logger"
import { TrayManager } from "../manager/trayManager"
import { MenuManager } from "../manager/menuManager"
import { AppUpdater } from "../updater/autoUpdater"
import { StoreManager } from "../manager/storeManager.ts"
import { loadingHtml } from "../utils/constants.ts"

const logger = new Logger("MainProcess")

export class MainApp {
  private ipcHandler = new IpcHandler()
  private windowManager = new WindowManager(this.ipcHandler)
  private trayManager = new TrayManager()
  private menuManager = new MenuManager()
  private renderLogger = new Logger("RenderProcess")
  private renderStore = new StoreManager("renderStore")
  private themeStore = new StoreManager<ThemeStore>("themeStore")

  constructor() {
    this.registerAppEvents()
    this.registerIpcHandlers()
    this.registerIpcListeners()
  }

  private registerAppEvents() {
    app.on("window-all-closed", () => {
      logger.info("All windows closed. Quitting app.")
      app.quit()
    })

    app.on("activate", () => {
      if (!this.windowManager.getWindow("main")) {
        this.createMainWindow()
      }
    })
  }

  private registerIpcHandlers() {
    this.ipcHandler.handle("platform", () => process.platform)
    this.ipcHandler.handle("store:get", (_, key: string) => this.renderStore.get(key))
    this.ipcHandler.handle("store:set", (_, key: string, value: StoreType) => this.renderStore.set(key, value))
    this.ipcHandler.handle("store:delete", (_, key: string) => this.renderStore.delete(key))
    this.ipcHandler.handle("store:clear", () => this.renderStore.clear())
    this.ipcHandler.handle("theme:set", (_, key: keyof ThemeStore, value: StoreType) => this.themeStore.set(key, value))
  }

  private registerIpcListeners() {
    this.ipcHandler.on("log", (_, level: LogLevel, message: string, ...args) =>
      this.renderLogger[level](message, ...args)
    )
  }

  private createMainWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const windowWidth = Math.floor(width * 0.8)
    const windowHeight = Math.floor(height * 0.8)
    const windowMinWidth = Math.floor(width * 0.6)
    const windowMinHeight = Math.floor(height * 0.6)
    const mainWindow = this.windowManager.createWindow({
      key: "main",
      options: {
        width: windowWidth,
        height: windowHeight,
        minWidth: windowMinWidth,
        minHeight: windowMinHeight,
        frame: false,
        titleBarStyle: "hiddenInset",
        trafficLightPosition: { x: 8, y: 14 },
        show: false
      },
    })
    const loadingWindow = this.windowManager.createWindow({
      key: "loading",
      path: loadingHtml,
      options: {
        width: windowWidth,
        height: windowHeight,
        minWidth: windowMinWidth,
        minHeight: windowMinHeight,
        frame: false,
        titleBarStyle: "hiddenInset",
        trafficLightPosition: { x: 8, y: 14 },
      },
    })
    new AppUpdater(mainWindow, this.ipcHandler, this.windowManager)
    loadingWindow.webContents.executeJavaScript(`
    document.documentElement.style.setProperty('--color-bg', '${this.themeStore.get("backgroundColor")}');
    document.documentElement.style.setProperty('--color-primary', '${this.themeStore.get("primaryColor")}');
  `).then()
    mainWindow.webContents.on('did-finish-load', () => {
      setTimeout(() => {
        if (loadingWindow.isDestroyed()) return
        loadingWindow.close()
        mainWindow.show()
      }, 500)
    })
  }

  private setupTray() {
    const window = this.windowManager.getWindow("main") as BrowserWindow
    this.trayManager.createTray({ key: "main", window })
  }

  private setupMenu() {
    this.menuManager.createMenu({
      key: "main",
      template: [
        {
          label: app.getName(),
          submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }],
        },
        {
          label: "编辑",
          submenu: [
            { role: "undo", label: "撤销" },
            { role: "redo", label: "重做" },
            { type: "separator" },
            { role: "cut", label: "剪切" },
            { role: "copy", label: "复制" },
            { role: "paste", label: "粘贴" },
            { role: "pasteAndMatchStyle", label: "粘贴并匹配样式" },
            { role: "selectAll", label: "全选" },
          ],
        },
        {
          label: "窗口",
          submenu: [
            { role: "minimize", label: "最小化" },
            { role: "close", label: "关闭" },
          ],
        },
        {
          label: "视图",
          submenu: [
            { role: "reload", label: "刷新" },
            { type: "separator" },
            { role: "togglefullscreen", label: "全屏切换" },
          ],
        },
        {
          label: "工具",
          submenu: [
            {
              label: "打开日志文件",
              click: () => shell.openPath(logger.getFilePath()),
              accelerator: "CommandOrControl+Alt+L",
            },
            { type: "separator" },
            { role: "toggleDevTools", label: "切换开发者工具" },
          ],
        },
      ],
    })
  }

  public start() {
    app.whenReady().then(() => {
      logger.info("App started")
      this.createMainWindow()
      this.setupTray()
      this.setupMenu()
    })
  }
}
