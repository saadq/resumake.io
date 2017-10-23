/**
 * @flow
 */

import Router from 'koa-router'
import { generatePDF } from '../generator'

const router = new Router({ prefix: '/api' })

router.post('/generate/resume', async ctx => {
  const formData = ctx.request.body
  console.log({ formData, generatePDF })
  ctx.body = { status: 'get success' }
})

export default router
