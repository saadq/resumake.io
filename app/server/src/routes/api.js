/**
 * @flow
 */

import Router from 'koa-router'
import { createReadStream } from 'fs'

const router = new Router({ prefix: '/api' })

router.post('/generate/resume', async ctx => {
  ctx.body = createReadStream(`${__dirname}/resume.pdf`)
})

export default router
