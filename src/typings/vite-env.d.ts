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
}

declare namespace Env {
  interface ImportMeta extends ImportMetaEnv {
    readonly VITE_ICON_PREFIX: "icon"
    readonly VITE_APP_TITLE: string
    readonly VITE_ICON_LOCAL_PREFIX: string
  }
}

type ImportMetaEnv = Env.ImportMeta

interface ImportMeta {
  readonly env: ImportMetaEnv
}
