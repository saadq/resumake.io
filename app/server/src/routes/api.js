/**
 * @flow
 */

import Router from 'koa-router'
import { generatePDF, generateSourceCode } from '../generator'
import { sanitizer } from '../middleware'

const router = new Router({ prefix: '/api' })

/**
 * Sanitize form data before handling PDF or source code generation
 */

router.use('/generate', sanitizer())

/**
 * Generate PDF from form data
 */

router.post('/generate/resume', async ctx => {
  ctx.body = generatePDF(ctx.request.body)
  ctx.type = 'application/pdf'
})

/**
 * Generate TeX source from form data
 */

router.post('/generate/source', async ctx => {
  ctx.body = generateSourceCode(ctx.request.body)
  ctx.type = 'application/zip'
})

export default router
