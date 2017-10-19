/**
 * @flow
 */

import type { Middleware } from 'koa'

/**
 * Top level error handler middleware that
 * catches any errors thrown from downstream.
 */

function errorHandler(): Middleware {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  }
}

module.exports = errorHandler
