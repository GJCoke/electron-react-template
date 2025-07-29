import { contextBridge } from "electron"
import { ipcBridge } from "./bridge/ipc"
import { windowBridge } from "./bridge/window"
import { loggerBridge } from "./bridge/logger"
import { updaterBridge } from "./bridge/updater"
import { storeBridge } from "./bridge/store"

contextBridge.exposeInMainWorld("electronAPI", ipcBridge)
contextBridge.exposeInMainWorld("electronWindow", windowBridge)
contextBridge.exposeInMainWorld("electronLogger", loggerBridge)
contextBridge.exposeInMainWorld("electronUpdater", updaterBridge)
contextBridge.exposeInMainWorld("electronStore", storeBridge)
