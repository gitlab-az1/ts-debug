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


/**
 * Creates a new debug instance
 * 
 * @param {string} namespace The namespace to use for the debug instance 
 * @returns {Debug} The debug instance
 */
export function createDebug(namespace: string): Debug {
  if(typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
    throw new Error('Browser support for this module is not implemented yet');
  }

  return createNodeDebug(namespace);
}

export default createDebug;