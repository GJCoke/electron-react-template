import { app, BrowserWindow } from "electron"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
  console.log(path.join(__dirname, "../preload.js"), 'preload')
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"), // after build
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL).then(() => {})
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html")).then(() => {})
  }
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  app.quit()
})
