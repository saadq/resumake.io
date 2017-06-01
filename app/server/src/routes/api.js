const Router = require('koa-router')
const { generatePDF, generateSourceCode } = require('../generator')

const router = new Router({ prefix: '/api' })

/**
 * Generates a PDF from the request body which
 * is then sent to the client.
 */
router.post('/generate/resume', async ctx => {
  ctx.body = generatePDF(ctx.request.body)
  ctx.type = 'application/pdf'
})

/**
 * Generates resume source files from request body and
 * saves it to a zip which is then sent to the client.
 */
router.post('/generate/source', async ctx => {
  ctx.body = generateSourceCode(ctx.request.body)
  ctx.type = 'application/zip'
})

module.exports = router
