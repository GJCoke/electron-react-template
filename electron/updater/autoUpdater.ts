import { type UpdateFileInfo } from "electron-updater"
import { BrowserWindow } from "electron"
import { Logger } from "../utils/logger"
import { IpcHandler } from "../core/ipcHandler.ts"
import { isMac } from "../utils/constants.ts"
import { WindowManager } from "../manager/windowManager.ts"
import { ensureEndsWithSlash } from "../utils/utils.ts"
import { MacUpdater } from "./macUpdater.ts"
import updater from 'electron-updater'
import { throttle } from "lodash-es"

const { autoUpdater } = updater
const logger = new Logger("Updater")

// dev auto updater.
// dev env updater test need project dir add dev-app-update.yml file
// autoUpdater.forceDevUpdateConfig = true

export class AppUpdater {
  private win: BrowserWindow
  private handler: IpcHandler
  private winManager: WindowManager
  private readonly updateUrl: string = ensureEndsWithSlash(import.meta.env.VITE_UPDATER_URL)
  private macUpdater: MacUpdater | null = isMac ? new MacUpdater() : null

  constructor(win: BrowserWindow, handler: IpcHandler, winManager: WindowManager) {
    this.win = win
    this.handler = handler
    this.winManager = winManager
    autoUpdater.autoInstallOnAppQuit = false
    autoUpdater.logger = logger
    autoUpdater.setFeedURL({
      provider: "generic",
      url: this.updateUrl,
    })
    if (isMac) {
      autoUpdater.autoDownload = false
    }

    this.registerEvents()
    this.setupFallbackUpdateTrigger()
  }

  private fallbackTimer: NodeJS.Timeout | null = null
  private hasUpdateBeenTriggered = false
  private readonly timeout: number = 2000

  private setupFallbackUpdateTrigger() {
    // 启动兜底定时器：5 秒后自动触发更新检查
    this.fallbackTimer = setTimeout(() => {
      if (!this.hasUpdateBeenTriggered) {
        logger.warn("Update not triggered in time by the rendering layer, falling back to automatic update check")
        this.checkForUpdates()
        this.registerUpdaterEvents()
      }
    }, this.timeout)
  }

  private registerEvents() {
    this.handler.on("update:install", () => {
      logger.info("Starting application installation")
      if (isMac) {
        this.macUpdater?.openDmgAndCloseApp()
        this.winManager.closeAll()
      } else {
        autoUpdater.quitAndInstall()
      }
    })

    const throttledCheck = throttle(
      () => {
        logger.info("Rendering layer is ready, preparing to check for updates")
        this.hasUpdateBeenTriggered = true
        if (this.fallbackTimer) clearTimeout(this.fallbackTimer)

        this.checkForUpdates()
        this.registerUpdaterEvents()
      },
      5000,
      { leading: true, trailing: false }
    )

    this.handler.on("update:ready", () => {
      throttledCheck()
    })
  }

  private getDmgUrl(files: UpdateFileInfo[]): string | undefined {
    const dmgFile = files.find((file) => file.url.endsWith(".dmg"))
    return dmgFile?.url
  }

  private registerUpdaterEvents() {
    autoUpdater.on("update-available", (updateInfo) => {
      const { force, info, version } = updateInfo as unknown as UpdateInfo
      logger.info(`New version available, version: ${version}, mandatory update: ${force}, version features: ${info}`)
      this.win.webContents.send("update:available", { force: force || false, info: info || "", version })

      const dmgUrl = this.getDmgUrl(updateInfo.files)
      if (isMac && dmgUrl && this.macUpdater) {
        const fullUrl = `${this.updateUrl}${dmgUrl}`
        if (!this.macUpdater.shouldDownload(dmgUrl)) {
          return this.win.webContents.send("update:downloaded", { force, version, info })
        }

        this.macUpdater
          .downloadDmg(dmgUrl, fullUrl, (percent) => {
            this.win.webContents.send("update:progress", percent)
          })
          .then(() => {
            this.win.webContents.send("update:downloaded", { force, version, info })
          })
          .catch((err) => {
            this.win.webContents.send("update:error", err.message)
          })
      }
    })

    autoUpdater.on("update-not-available", () => {
      logger.info("The current version is already the latest version.")
      this.win.webContents.send("update:not-available")
    })

    autoUpdater.on("error", (err) => {
      logger.info("Update error. Error message: ", err.message)
      this.win.webContents.send("update:error", err.message)
    })

    autoUpdater.on("download-progress", (progress) => {
      logger.info(`Package download progress: ${progress.percent}%`)
      this.win.webContents.send("update:progress", progress.percent)
    })

    autoUpdater.on("update-downloaded", (updateInfo) => {
      const { force, version, info } = updateInfo as unknown as UpdateInfo
      logger.info(`Package download completed. Version: ${version}, Mandatory Update: ${force}`)
      this.win.webContents.send("update:downloaded", { force: force || false, info: info || "", version })
    })
  }

  private checkForUpdates() {
    autoUpdater.checkForUpdates().then()
  }
}
