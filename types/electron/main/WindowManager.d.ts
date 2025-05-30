import { BrowserWindow } from "electron";
interface WindowOptions {
    key: string;
    options: Electron.BrowserWindowConstructorOptions;
    url?: string;
}
export declare class WindowManager {
    private windows;
    createWindow({ key, options, url }: WindowOptions): BrowserWindow;
    getWindow(key: string): BrowserWindow | undefined;
    closeAll(): void;
}
export {};
