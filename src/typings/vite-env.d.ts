/// <reference types="vite/client" />
interface Window {
  electronAPI?: {
    ping: () => Promise<string>
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
