/**
 * @flow
 */

import Router from 'koa-router'
import formidable from 'koa2-formidable'
import { generatePDF, generateSourceCode } from '../generator'
import { sanitizer, jsonResume } from '../middleware'

const router = new Router({ prefix: '/api' })

router.get('/json', async ctx => {
  ctx.body = { name: 'saad' }
})

/**
 * Router middleware
 */

router.use('/generate', sanitizer()) // Remove falsy values and empty objects/arrays from request body
router.use('/upload', formidable(), jsonResume()) // Parse multipart/form-data

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

/**
 * Handle JSON upload from input file
 */

router.post('/upload', async ctx => {
  ctx.body = ctx.request.jsonResume
  ctx.type = 'application/json'
})

export default router
