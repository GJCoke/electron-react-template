import path from "node:path"
import { fileURLToPath } from "url"
import { join } from "path"
import { app } from "electron"

export const isMac = process.platform === "darwin"
export const isWindows = process.platform === "win32"
export const isLinux = process.platform === "linux"

export const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const VITE_DEV_SERVER_URL = import.meta.env.VITE_DEV_SERVER_URL

export const preloadPath = join(__dirname, "./preload/index.mjs")
export const indexHtml = join(__dirname, "../dist/index.html")
export const loadingHtml = join(__dirname, "../dist/loading.html")
export const DownloadsPath = app.getPath("downloads")
