declare module 'memoryjs' {
  export function openProcess(processName: string): Process;

  export function readMemory<T>(handle: number, address: number, dataType: string): T;

  export interface Process {
    cntThreads: number;
    dwSize: number;
    handle: number;
    modBaseAddr: number;
    pcPriClassBase: number;
    szExeFile: string;
    th32ParentProcessID: number;
    th32ProcessID: number;
  }

  export const BOOL: string;
  export const BYTE: string;
  export const UBYTE: string;
  export const CHAR: string;
  export const UCHAR: string;
  export const INT32: string;
  export const UINT32: string;
  export const INT64: string;
  export const UINT64: string;
  export const STRING: string;
  export const POINTER: string;
}
