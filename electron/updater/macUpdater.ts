import fs from "node:fs"
import path from "node:path"
import { shell } from "electron"
import { Logger } from "../utils/logger"
import { DownloadsPath } from "../utils/constants"
import https from "node:https"
import http from "node:http"
import { throttle } from "lodash-es"

const logger = new Logger("MacUpdater")

export class MacUpdater {
  private saveDmgPath: string | null = null

  getSavedPath(): string | null {
    return this.saveDmgPath
  }

  shouldDownload(dmgUrl: string): boolean {
    this.saveDmgPath = path.join(DownloadsPath, dmgUrl)
    return !fs.existsSync(this.saveDmgPath)
  }

  async downloadDmg(url: string, dest: string, onProgress?: (percent: number) => void): Promise<void> {
    if (!this.saveDmgPath) return
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest)
      const client = url.startsWith("https") ? https : http

      const throttledProgress = onProgress
        ? throttle((percent: number) => onProgress(parseFloat(percent.toFixed(2))), 200)
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
              throttledProgress?.(percent)
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

  openDmgAndCloseApp(): void {
    if (!this.saveDmgPath) return
    shell.openPath(this.saveDmgPath).then((errorMessage) => {
      if (errorMessage) {
        logger.error("Failed to open file: ", errorMessage)
      } else {
        logger.debug("File opened successfully: ", this.saveDmgPath)
      }
    })
  }
}
