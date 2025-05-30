type IpcCallback = (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any;
export declare class IpcHandler {
    register(channel: string, handler: IpcCallback): void;
    unregister(channel: string): void;
}
export {};
