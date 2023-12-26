import { createNodeDebug } from './node';
import { Debug } from './types';



declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Process {
      type: string;
      browser: boolean;
      __nwjs: boolean;
    }
  }
}


export function createDebug(namespace: string): Debug {
  if(typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
    throw new Error('Browser support for this module is not implemented yet');
  }

  return createNodeDebug(namespace);
}

export default createDebug;