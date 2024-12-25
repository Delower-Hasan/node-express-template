/* eslint-disable @typescript-eslint/no-explicit-any */

export const slugMaker = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/^-+|-+$/g, '')
}

export const isObjectWithKey = (value: any, key: string) => {
  if (
    typeof value === 'object' &&
    value !== null &&
    Object.prototype.toString.call(value) === '[object Object]'
  ) {
    return key in value
  }
  return false
}
