import { format } from 'node:util';
import { jsonSafeStringify } from 'typesdk/safe-json';
import { removeAsciCharacters } from 'typesdk/logger';
import { format as asciformat } from 'typesdk/utils/asci';

import type { Debug, Dict } from './types';


export function createNodeDebug(ns: string): Debug {
  const logs: any[] = [];

  const colorize = (str: string): string => {
    return str.replace(/\$\(([^)]+)\)/g, (match, code) => {
      return (asciformat.colors as Dict<string>)[code] ?? match;
    });
  };

  const reset = () => {
    logs.length = 0;
  };

  const debug = (message: string, ...args: unknown[]) => {
    const stream = (['info', 'debug'].includes(ns.toLowerCase())) ? 'stdout' : 'stderr';
    const base = format(message, ...args);
    const d = new Date().toISOString();

    logs.push({
      message: removeAsciCharacters(base),
      index: logs.length,
      date: d,
      stream,
    });

    process[stream].write(`${asciformat.colors.green}${d}${asciformat.reset} ${asciformat.colors.brightYellow}[${ns}]${asciformat.reset} ${colorize(base)}\n`);
  };

  return Object.freeze({
    get namespace(): string {
      return ns;
    },

    debug,
    reset,

    serialize() {
      return jsonSafeStringify(logs) ?? '[]';
    },
  });
}

export default createNodeDebug;