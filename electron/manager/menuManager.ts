import { Menu, MenuItemConstructorOptions } from "electron"

interface MenuOptions {
  key: string
  template: MenuItemConstructorOptions[]
}

export class MenuManager {
  private menus = new Map<string, Menu>()

  createMenu({ key, template }: MenuOptions): Menu {
    if (this.menus.has(key)) {
      return this.menus.get(key)!
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    this.menus.set(key, menu)
    return menu
  }

  getMenu(key: string): Menu | undefined {
    return this.menus.get(key)
  }

  destroyMenu(key: string) {
    if (this.menus.has(key)) {
      this.menus.delete(key)
      Menu.setApplicationMenu(null)
    }
  }

  destroyAll() {
    this.menus.clear()
    Menu.setApplicationMenu(null)
  }
}
