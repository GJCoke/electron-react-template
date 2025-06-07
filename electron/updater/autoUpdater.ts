import { autoUpdater, type UpdateFileInfo } from "electron-updater"
import { BrowserWindow, shell } from "electron"
import { Logger } from "../utils/logger"
import { IpcHandler } from "../core/ipcHandler.ts"
import { isMac, DownloadsPath } from "../utils/constants.ts"
import fs from "node:fs"
import https from "node:https"
import http from "node:http"
import { WindowManager } from "../manager/windowManager.ts"
import { ensureEndsWithSlash } from "../utils/utils.ts"
import path from "node:path"
import { throttle } from "lodash"

const logger = new Logger("Updater")

// dev auto updater.
// dev env updater test need project dir add dev-app-update.yml file
// autoUpdater.forceDevUpdateConfig = true

function downloadDmg(url: string, dest: string, onProgress?: (percent: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const client = url.startsWith("https") ? https : http

    const throttledProgress = onProgress
      ? throttle((percent: number) => {
          onProgress(parseFloat(percent.toFixed(2)))
        }, 200)
      : undefined

    client
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Download failed: ${response.statusCode}`))
          return
        }

        const total = parseInt(response.headers["content-length"] || "0", 10)
        let downloaded = 0

        response.on("data", (chunk) => {
          downloaded += chunk.length
          if (total && onProgress) {
            const percent = (downloaded / total) * 100
            throttledProgress?.(parseFloat(percent.toFixed(2)))
          }
        })

        response.pipe(file)
        file.on("finish", () => {
          file.close()
          resolve()
        })
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {})
        reject(err)
      })
  })
}

export class AppUpdater {
  private win: BrowserWindow
  private handler: IpcHandler
  private winManager: WindowManager
  private readonly updateUrl: string = ensureEndsWithSlash(import.meta.env.VITE_UPDATER_URL)
  private saveDmgPath: string | null = null

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
    this.handler.handle("update:install", () => {
      logger.info("Starting application installation")
      if (isMac) {
        if (!this.saveDmgPath) return
        shell.openPath(this.saveDmgPath).then((errorMessage) => {
          if (errorMessage) {
            logger.error("Failed to open file: ", errorMessage)
          } else {
            logger.debug("File opened successfully: ", this.saveDmgPath)
            this.winManager.closeAll()
          }
        })
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

    this.handler.handle("update:ready", () => {
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
      this.win.webContents.send("update:available", { force, info, version })

      const dmgUrl = this.getDmgUrl(updateInfo.files)
      if (isMac && dmgUrl) {
        this.saveDmgPath = path.join(DownloadsPath, dmgUrl)

        if (fs.existsSync(this.saveDmgPath)) {
          return this.win.webContents.send("update:downloaded", { force, version, info })
        }

        downloadDmg(`${this.updateUrl}${dmgUrl}`, this.saveDmgPath, (percent) => {
          logger.info(`Package download progress: ${percent}%`)
          this.win.webContents.send("update:progress", percent)
        })
          .then(() => {
            logger.info("DMG download completed. Path:", this.saveDmgPath)
            this.win.webContents.send("update:downloaded", { force, version, info })
          })
          .catch((err: Error) => {
            this.win.webContents.send("update:error", err.message)
            logger.error("Download failed: ", err.message)
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
      this.win.webContents.send("update:downloaded", { force, version, info })
    })
  }

  private checkForUpdates() {
    autoUpdater.checkForUpdates().then()
  }
}
