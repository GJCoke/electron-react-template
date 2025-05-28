// src/main/MainApp.ts
import { app, screen } from "electron"
import { IpcHandler } from "./IpcHandler"
import { WindowManager } from "./WindowManager"

export class MainApp {
  private ipcHandler: IpcHandler
  private windowManager: WindowManager

  constructor() {
    this.ipcHandler = new IpcHandler()
    this.windowManager = new WindowManager()

    this.registerEvents()
    this.registerIpc()
  }

  private registerEvents() {
    app.on("window-all-closed", () => {
      app.quit()
    })

    app.on("activate", () => {
      if (!this.windowManager.getWindow("main")) {
        this.createMainWindow()
      }
    })
  }

  private registerIpc() {
    this.ipcHandler.register("ping", () => "pong1")
  }

  private createMainWindow() {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    const windowWidth = Math.floor(width * 0.8)
    const windowHeight = Math.floor(height * 0.8)
    const minWidth = Math.floor(width * 0.5)
    const minHeight = Math.floor(height * 0.5)

    this.windowManager.createWindow({
      key: "main",
      options: {
        width: windowWidth,
        height: windowHeight,
        minWidth: minWidth,
        minHeight: minHeight,
      },
    })
  }

  public start() {
    app.whenReady().then(() => {
      this.createMainWindow()
    })
  }
}
