type LogLevel = "error" | "warn" | "info" | "verbose" | "debug" | "silly"

interface UpdateInfo {
  version: string
  force: boolean
  info: string
}

type Callback<T> = (data: T) => void

interface WindowOptions {
  key: string
  options: Electron.BrowserWindowConstructorOptions
  url?: string
}
