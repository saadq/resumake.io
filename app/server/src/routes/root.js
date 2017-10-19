/**
 * @flow
 */

const Router = require('koa-router')
const { createReadStream } = require('fs')
const { join } = require('path')

const router = new Router()

/**
 * Let the client handle all other routes
 */

router.get('*', async ctx => {
  const path = join(__dirname, '..', '..', '..', 'client', 'dist', 'index.html')

  ctx.body = createReadStream(path)
  ctx.type = 'text/html'
})

module.exports = router
