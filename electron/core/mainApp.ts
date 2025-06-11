import { app, BrowserWindow, MenuItemConstructorOptions, screen, shell } from "electron"
import { IpcHandler } from "./ipcHandler"
import { WindowManager } from "../manager/windowManager"
import { Logger } from "../utils/logger"
import { TrayManager } from "../manager/trayManager"
import { MenuManager } from "../manager/menuManager"
import { AppUpdater } from "../updater/autoUpdater"
import { StoreManager } from "../manager/storeManager.ts"
import { isDebug } from "../utils/constants.ts"

const logger = new Logger("MainProcess")

export class MainApp {
  private ipcHandler = new IpcHandler()
  private trayManager = new TrayManager()
  private menuManager = new MenuManager()
  private renderLogger = new Logger("RenderProcess")
  private renderStore = new StoreManager("renderStore")
  private themeStore = new StoreManager<ThemeStore>("themeStore")
  private windowManager = new WindowManager(this.ipcHandler, this.themeStore)

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
    const mainWindow = this.windowManager.createWindow({
      key: "main",
      options: {
        width: Math.floor(width * 0.8),
        height: Math.floor(height * 0.8),
        minWidth: Math.floor(width * 0.6),
        minHeight: Math.floor(height * 0.6),
        frame: false,
        titleBarStyle: "hiddenInset",
        trafficLightPosition: { x: 8, y: 14 },
      },
    })
    new AppUpdater(mainWindow, this.ipcHandler, this.windowManager)
  }

  private setupTray() {
    const window = this.windowManager.getWindow("main") as BrowserWindow
    this.trayManager.createTray({ key: "main", window })
  }

  private setupMenu() {
    const devMenu: MenuItemConstructorOptions = {
      label: "开发工具",
      submenu: [
        { role: "reload", label: "刷新" },
        { role: "toggleDevTools", label: "切换开发者工具" },
        { type: "separator" },
        {
          label: "打开日志文件",
          click: () => shell.openPath(logger.getFilePath()),
          accelerator: "CommandOrControl+Alt+L",
        },
      ],
    }

    const template: MenuItemConstructorOptions[] = [
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
    ]

    isDebug && template.push(devMenu)

    this.menuManager.createMenu({
      key: "main",
      template,
    })
  }

  public start() {
    app.whenReady().then(() => {
      logger.info("App started")
      this.setupMenu()
      this.setupTray()
      this.createMainWindow()
    })
  }
}
