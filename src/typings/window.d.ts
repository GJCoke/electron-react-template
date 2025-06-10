/// <reference types="vite/client" />
interface Window {
  electronAPI?: {
    platform: () => Promise<string>
  }

  electronWindow?: {
    maximize: () => void
    minimize: () => void
    isMaximized: () => Promise<boolean>
    isMinimized: () => Promise<boolean>
    toggleMaximize: () => void
    close: () => void
    onMaximize: (callback: () => void) => void
    onUnmaximize: (callback: () => void) => void
  }

  electronLogger?: {
    info: (message: string, ...args: unknown[]) => void
    warn: (message: string, ...args: unknown[]) => void
    error: (message: string, ...args: unknown[]) => void
    debug: (message: string, ...args: unknown[]) => void
    verbose: (message: string, ...args: unknown[]) => void
    silly: (message: string, ...args: unknown[]) => void
  }

  electronUpdater?: {
    onUpdateAvailable: (callback: (info: UpdateInfo) => void) => void
    onUpdateNotAvailable: (callback: () => void) => void
    onDownloaded: (callback: (info: UpdateInfo) => void) => void
    installUpdate: () => void
    onUpdateError: (callback: (message: string) => void) => void
    onUpdateProgress: (callback: (percent: number) => void) => void
    updateReady: () => void
  }

  electronStore?: {
    get: (key: string) => Promise<StoreType>
    set: (key: string, value: StoreType) => Promise<boolean>
    delete: (key: string) => Promise<boolean>
    clear: () => Promise<boolean>
    themeSet: <K extends keyof ThemeStore>(key: K, value: ThemeStore[K]) => Promise<boolean>
  }
}
