/**
 * @flow
 */

import Router from 'koa-router'
import { createReadStream } from 'fs'
import { join } from 'path'

const router = new Router()

/**
 * Let the client handle all other routes (only used in production)
 */

router.get('*', async ({ response }) => {
  const path = join(__dirname, '..', '..', 'dist', 'index.html')
  response.body = createReadStream(path)
  response.type = 'text/html'
})

export default router
