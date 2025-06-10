import { Tray, Menu, app, BrowserWindow, nativeImage } from "electron"
import path from "path"
import { __dirname } from "../utils/constants.ts"

interface TrayOptions {
  key: string
  window: BrowserWindow
  iconPath?: string
}

export class TrayManager {
  private trays = new Map<string, Tray>()

  createTray({ key, window, iconPath }: TrayOptions): Tray {
    if (this.trays.has(key)) {
      return this.trays.get(key)!
    }

    const trayIcon = nativeImage
      .createFromPath(iconPath ?? path.join(__dirname, "../public/tray.png"))
      .resize({ width: 18, height: 18 })

    const tray = new Tray(trayIcon)
    tray.setToolTip(app.getName())
    tray.setContextMenu(this.buildMenu(window))

    this.trays.set(key, tray)
    return tray
  }

  getTray(key: string): Tray | undefined {
    return this.trays.get(key)
  }

  destroyTray(key: string) {
    const tray = this.trays.get(key)
    if (tray) {
      tray.destroy()
      this.trays.delete(key)
    }
  }

  destroyAll() {
    this.trays.forEach((tray) => tray.destroy())
    this.trays.clear()
  }

  private buildMenu(window: BrowserWindow) {
    return Menu.buildFromTemplate([
      { label: "显示", click: () => window.show() },
      { label: "隐藏", click: () => window.hide() },
      { type: "separator" },
      { label: "退出", click: () => app.quit() },
    ])
  }
}
