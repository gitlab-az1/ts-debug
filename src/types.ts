export type Dict<T> = {
  [key: string]: T;
}

export type LogFn = (message: string, ...args: any[]) => void;


export interface Debug {

  /** Debugs a message */
  debug: LogFn;

  /** Reset the messages list */
  reset: () => void;

  /** Serialize the messages list to JSON */
  serialize: () => string;

  /** Get the instance namespace */
  readonly namespace: string;
}