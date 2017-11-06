/**
 * @flow
 */

import Router from 'koa-router'
import { generatePDF, generateSourceCode } from '../generator'
import { sanitizer } from '../middleware'

const router = new Router({ prefix: '/api' })

/**
 * Sanitize form data before handling any API requests
 */

router.use(sanitizer())

/**
 * Generate PDF from form data
 */

router.post('/generate/resume', async ctx => {
  ctx.body = generatePDF(ctx.request.body)
})

/**
 * Generate TeX source from form data
 */

router.post('/generate/source', async ctx => {
  ctx.body = generateSourceCode(ctx.request.body)
})

export default router
