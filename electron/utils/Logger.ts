import log from "electron-log"

export class Logger {
  private readonly namespace: string

  constructor(namespace = "default") {
    this.namespace = namespace

    log.transports.file.level = "info"
    log.transports.console.level = "silly"
    log.transports.file.format = "{y}-{m}-{d} {h}:{i}:{s} [{level}] {text}"
    log.transports.file.maxSize = 5 * 1024 * 1024 // 5MB
  }

  setLevel(level: LogLevel) {
    log.transports.file.level = level
    log.transports.console.level = level
  }

  setFilePath(path: string) {
    log.transports.file.resolvePathFn = () => path
  }

  getFilePath() {
    return log.transports.file.getFile().path
  }

  error(message: string, ...args: unknown[]): void {
    log.error(`[${this.namespace}] ${message}`, ...args)
  }

  warn(message: string, ...args: unknown[]): void {
    log.warn(`[${this.namespace}] ${message}`, ...args)
  }

  info(message: string, ...args: unknown[]): void {
    log.info(`[${this.namespace}] ${message}`, ...args)
  }

  verbose(message: string, ...args: unknown[]): void {
    log.verbose(`[${this.namespace}] ${message}`, ...args)
  }

  debug(message: string, ...args: unknown[]): void {
    log.debug(`[${this.namespace}] ${message}`, ...args)
  }

  silly(message: string, ...args: unknown[]): void {
    log.silly(`[${this.namespace}] ${message}`, ...args)
  }
}
