const Router = require('koa-router')
const Archiver = require('archiver')
const prettify = require('pretty-latex')
const generate = require('../generator')

const router = new Router({ prefix: '/api' })

/**
 * Generates a PDF from the request body which
 * is then sent to the client.
 */
router.post('/generate/resume', async ctx => {
  ctx.body = await generate(ctx.request.body)
  ctx.type = 'application/pdf'
})

/**
 * Generates resume source files from request body
 * and saves it to a zip to send to the client.
 */
router.post('/generate/source', async ctx => {
  const { texDoc, opts } = generate(ctx.request.body)
  const zip = Archiver('zip')

  zip.on('error', err => {
    ctx.throw(400, err.message)
  })

  zip.append(prettify(texDoc), { name: 'resume.tex' })

  if (opts.inputs) {
    zip.directory(opts.inputs, 'inputs')
  }

  zip.finalize()

  ctx.type = 'application/octet-stream'
  ctx.body = zip
})

module.exports = router
