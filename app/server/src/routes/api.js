/**
 * @flow
 */

import Router from 'koa-router'
import formidable from 'koa2-formidable'
import { readFile } from 'fs-promise'
import { generatePDF, generateSourceCode } from '../generator'
import { sanitizer } from '../middleware'

const router = new Router({ prefix: '/api' })

/**
 * Router middleware
 */

router.use('/generate', sanitizer()) // Remove falsy values and empty objects/arrays from request body
router.use('/upload', formidable()) // Parse multipart/form-data

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
  const { path } = ctx.request.files['json-file']
  const file = await readFile(path)
  const json = JSON.parse(file)

  ctx.body = json
  ctx.type = 'application/json'
})

export default router
