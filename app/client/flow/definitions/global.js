/**
 * @flow
 */

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
}

declare var require: {
  context(path: string, includeSubdirs: boolean, regExp?: RegExp): any
}
