import * as string from './string.js'
import * as env from './environment.js'

export const createUint8ArrayFromLen = len => new Uint8Array(len)

/**
 * Create Uint8Array with initial content from buffer
 */
export const createUint8ArrayViewFromArrayBuffer = (buffer, byteOffset, length) => new Uint8Array(buffer, byteOffset, length)

/**
 * Create Uint8Array with initial content from buffer
 */
export const createUint8ArrayFromArrayBuffer = arraybuffer => new Uint8Array(arraybuffer)

/* istanbul ignore next */
/**
 * @param {Uint8Array} bytes
 * @return {string}
 */
const toBase64Browser = bytes => {
  let s = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    s += string.fromCharCode(bytes[i])
  }
  // eslint-disable-next-line no-undef
  return btoa(s)
}

/**
 * @param {Uint8Array} bytes
 * @return {string}
 */
const toBase64Node = bytes => Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString('base64')

/* istanbul ignore next */
/**
 * @param {string} s
 * @return {Uint8Array}
 */
const fromBase64Browser = s => {
  // eslint-disable-next-line no-undef
  const a = atob(s)
  const bytes = createUint8ArrayFromLen(a.length)
  for (let i = 0; i < a.length; i++) {
    bytes[i] = a.charCodeAt(i)
  }
  return bytes
}

const fromBase64Node = s => new Uint8Array(Buffer.from(s, 'base64').buffer)

/* istanbul ignore next */
export const toBase64 = env.isBrowser ? toBase64Browser : toBase64Node

/* istanbul ignore next */
export const fromBase64 = env.isBrowser ? fromBase64Browser : fromBase64Node
