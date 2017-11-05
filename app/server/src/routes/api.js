/**
 * @flow
 */

import Router from 'koa-router'
import { generatePDF, generateSourceCode } from '../generator'

const router = new Router({ prefix: '/api' })

router.post('/generate/resume', async ctx => {
  ctx.body = generatePDF(ctx.request.body)
})

router.post('/generate/source', async ctx => {
  ctx.body = generateSourceCode(ctx.request.body)
})

export default router
