import { contextBridge } from "electron"
import { ipcBridge } from "./bridge/ipc"
import { windowBridge } from "./bridge/window"
import { loggerBridge } from "./bridge/logger"

contextBridge.exposeInMainWorld("electronAPI", ipcBridge)
contextBridge.exposeInMainWorld("electronWindow", windowBridge)
contextBridge.exposeInMainWorld("electronLogger", loggerBridge)
