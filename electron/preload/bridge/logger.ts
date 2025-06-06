import { ipcRenderer } from "electron"

const consoleMethodMap = {
  error: "error",
  warn: "warn",
  info: "info",
  verbose: "debug",
  debug: "debug",
  silly: "log",
} as const

type LogLevel = keyof typeof consoleMethodMap

export const loggerBridge: Record<LogLevel, (...args: unknown[]) => void> = {} as never
;(Object.keys(consoleMethodMap) as LogLevel[]).forEach((level) => {
  loggerBridge[level] = (...args: unknown[]) => {
    ipcRenderer.send("log", level, ...args)
    const method = consoleMethodMap[level]
    console[method]?.(`[${level}]`, ...args)
  }
})
