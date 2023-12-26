export const ASCI_RED = '\x1b[31m';
export const ASCI_BOLD = '\x1b[1m';
export const ASCI_BLUE = '\x1b[34m';
export const ASCI_CYAN = '\x1b[36m';
export const ASCI_RESET = '\x1b[0m';
export const ASCI_GREEN = '\x1b[32m';
export const ASCI_YELLOW = '\x1b[33m';
export const ASCI_MAGENTA = '\x1b[35m';
export const ASCI_BRIGHT_RED = '\x1b[91m';
export const ASCI_BRIGHT_BLUE = '\x1b[94m';
export const ASCI_BRIGHT_CYAN = '\x1b[96m';
export const ASCI_BRIGHT_GREEN = '\x1b[92m';
export const ASCI_BRIGHT_YELLOW = '\x1b[93m';
export const ASCI_UNDERLINE = '\x1b[4m';


type ASCIColors = {
  readonly red: string;
  readonly blue: string;
  readonly cyan: string;
  readonly reset: string;
  readonly green: string;
  readonly yellow: string;
  readonly magenta: string;
  readonly brightRed: string;
  readonly brightBlue: string;
  readonly brightCyan: string;
  readonly brightGreen: string;
  readonly brightYellow: string;
};

export const colors: ASCIColors = Object.freeze({
  red: ASCI_RED,
  blue: ASCI_BLUE,
  cyan: ASCI_CYAN,
  reset: ASCI_RESET,
  green: ASCI_GREEN,
  yellow: ASCI_YELLOW,
  magenta: ASCI_MAGENTA,
  brightRed: ASCI_BRIGHT_RED,
  brightBlue: ASCI_BRIGHT_BLUE,
  brightCyan: ASCI_BRIGHT_CYAN,
  brightGreen: ASCI_BRIGHT_GREEN,
  brightYellow: ASCI_BRIGHT_YELLOW,
});


export const asciformat: {
  readonly colors: ASCIColors;
  readonly underline: string;
  readonly reset: string;
  readonly bold: string;
} = Object.freeze({
  colors,
  bold: ASCI_BOLD,
  reset: ASCI_RESET,
  underline: ASCI_UNDERLINE,
});


export function removeAsciCharacters(message: string): string {
  // eslint-disable-next-line no-control-regex
  return message.replace(/\u001b\[\d+m/g, '');
}


const kindOf = (cache => (thing: any) => {
  const str = Object.prototype.toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));


export const kindOfTest = (type: string) => {
  type = type.toLowerCase();
  return (thing: any) => kindOf(thing) === type;
};


type DataType =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

/**
 * Test if a value is of a certain type
 * @param type The type to test against
 * @returns {boolean} True if the value is of the specified type, otherwise false
 */
export const typeofTest = (type: DataType): ((thing: any) => boolean) => (thing: any) => typeof thing === type;


/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
export function isPlainObject(val: any): boolean {
  if(Array.isArray(val)) return false;
  if(kindOf(val) !== 'object' || typeof val !== 'object') return false;

  const prototype = Object.getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}