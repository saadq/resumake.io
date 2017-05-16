const Router = require('koa-router')
const Archiver = require('archiver')
const latex = require('node-latex')
const prettify = require('pretty-latex')
const generate = require('../generator')

const router = new Router({ prefix: '/api' })

/**
 * Generates the LaTeX from the request body and
 * then a PDF is created from the LaTeX doc which
 * is then sent to the client.
 */
router.post('/generate/resume', async (ctx) => {
  const { texDoc, opts } = generate(ctx.request.body)
  const pdf = latex(texDoc, opts)

  ctx.type = 'application/pdf'
  ctx.body = pdf
})

/**
 * Generates resume source files from request body
 * and saves it to a zip to send to the client.
 */
router.post('/generate/source', async (ctx) => {
  const { texDoc, opts } = generate(ctx.request.body)
  const zip = Archiver('zip')

  zip.on('error', (err) => {
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
