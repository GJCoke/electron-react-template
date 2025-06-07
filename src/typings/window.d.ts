/// <reference types="vite/client" />
interface Window {
  electronAPI?: {
    ping: () => Promise<string>
  }

  electronWindow?: {
    maximize: () => void
    minimize: () => void
    toggleMaximize: () => void
    close: () => void
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
    installUpdate: () => Promise<void>
    onUpdateError: (callback: (message: string) => void) => void
    onUpdateProgress: (callback: (percent: number) => void) => void
    updateReady: () => void
  }
}
