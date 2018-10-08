/**
 * @flow
 */

function titleCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

function isLengthGreaterThanOne(obj: any): boolean {
  return obj.length > 1
}

export { titleCase , isLengthGreaterThanOne }
