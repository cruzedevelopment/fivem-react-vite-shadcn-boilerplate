// FiveM NUI Message Structure
export interface NuiMessage<T = any> {
  action: string;
  data: T;
}

// NUI Callback Function
export interface NuiCallback {
  (data: any): void;
}

// FiveM Global Interface
declare global {
  interface Window {
    invokeNative?: (native: string, ...args: any[]) => any;
    GetParentResourceName?: () => string;
  }
}

// Common FiveM Data Types
export interface PlayerCoords {
  x: number;
  y: number;
  z: number;
}

export interface NuiHandlers {
  setVisible: (visible: boolean) => void;
  [key: string]: (data: any) => void;
}

// NUI Fetch Post Function Type
export type FetchNuiCb = (data: any, cb: NuiCallback) => void;

export {};