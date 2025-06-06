import { app, BrowserWindow, screen } from "electron"
import { IpcHandler } from "./ipcHandler"
import { WindowManager } from "../manager/windowManager"
import { Logger } from "../utils/logger"
import { TrayManager } from "../manager/trayManager"
import { MenuManager } from "../manager/menuManager"

const logger = new Logger("MainProcess")

export class MainApp {
  private ipcHandler = new IpcHandler()
  private windowManager = new WindowManager()
  private trayManager = new TrayManager()
  private menuManager = new MenuManager()
  private renderLogger = new Logger("RenderProcess")

  constructor() {
    logger.debug("Logger file path:", logger.getFilePath())
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
    this.ipcHandler.handle("ping", () => "pong1")
  }

  private registerIpcListeners() {
    this.ipcHandler.on("window:maximize", () => this.windowManager.maximize("main"))
    this.ipcHandler.on("window:minimize", () => this.windowManager.minimize("main"))
    this.ipcHandler.on("window:toggleMaximize", () => this.windowManager.toggleMaximize("main"))
    this.ipcHandler.on("log", (_, level: LogLevel, message: string, ...args) =>
      this.renderLogger[level](message, ...args)
    )
  }

  private createMainWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    this.windowManager.createWindow({
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
            { role: "toggleDevTools", label: "切换开发者工具" },
            { type: "separator" },
            { role: "togglefullscreen", label: "全屏切换" },
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
