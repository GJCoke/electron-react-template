import { ipcRenderer } from "electron"

export const consoleMethodMap = {
  error: "error",
  warn: "warn",
  info: "info",
  verbose: "debug",
  debug: "debug",
  silly: "log",
} as const

export type LogLevel = keyof typeof consoleMethodMap

export const loggerBridge: Record<LogLevel, (...args: unknown[]) => void> =
  (Object.keys(consoleMethodMap) as LogLevel[]).reduce((acc, level) => {
    acc[level] = (...args: unknown[]) => {
      ipcRenderer.send("log", level, ...args)
      const method = consoleMethodMap[level]
      console[method]?.(`[${level}]`, ...args)
    }
    return acc
  }, {} as Record<LogLevel, (...args: unknown[]) => void>)
