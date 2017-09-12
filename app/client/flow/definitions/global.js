/**
 * @flow
 */

declare var module: {
  hot: {
    accept(path: string, cb: () => void): void
  }
}
