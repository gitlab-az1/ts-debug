export type Dict<T> = {
  [key: string]: T;
}

export type LogFn = (message: string, ...args: any[]) => void;


export interface Debug {
  debug: LogFn;
  reset: () => void;
  serialize: () => string;
  readonly namespace: string;
}