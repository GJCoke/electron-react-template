declare namespace Env {
  interface ImportMeta {
    readonly VITE_ICON_PREFIX: "icon"
    readonly VITE_APP_TITLE: string
    readonly VITE_ICON_LOCAL_PREFIX: string
    readonly VITE_UPDATER_URL: string
    readonly VITE_DEV_SERVER_URL: string
    readonly VITE_STORE_ENCRYPTION_KEY: string
    readonly DEV: boolean
    readonly MODE: string
    readonly SSR: boolean
    readonly PROD: boolean
    readonly BASE_URL: string
  }
}

type ImportMetaEnv = Env.ImportMeta

interface ImportMeta {
  readonly env: ImportMetaEnv
}
