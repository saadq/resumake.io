/**
 * @flow
 */

import Router from 'koa-router'
import { generatePDF } from '../generator'

const router = new Router({ prefix: '/api' })

router.post('/generate/resume', async ctx => {
  ctx.body = generatePDF(ctx.request.body)
})

export default router
