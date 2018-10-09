/**
 * @flow
 */

function titleCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

export { titleCase }
