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
    const { response } = ctx
    try {
      await next()
    } catch (err) {
      response.status = err.status || 500
      response.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  }
}

export default errorHandler
