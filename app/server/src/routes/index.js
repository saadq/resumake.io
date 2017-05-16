const Router = require('koa-router')
const Archiver = require('archiver')
const prettify = require('pretty-latex')
const { generateTex, generatePDF } = require('../generator')

const router = new Router({ prefix: '/api' })

/**
 * Generates a PDF from the request body and sends it back to the client.
 * Saves the request body in a cookie for use in GET /generate/source.
 */
router.post('/generate/resume', async (ctx) => {
  const pdf = generatePDF(ctx.request.body)
  const encodedReqBody = encodeURIComponent(JSON.stringify(ctx.request.body))

  ctx.cookies.set('resume', encodedReqBody, { overwrite: true })

  ctx.type = 'application/pdf'
  ctx.body = pdf
})

/**
 * Retrieves the request body that was created during PDF generation, and sends
 * the client a generated LaTeX doc as well as the assets needed for that doc.
 */
router.get('/generate/source', async (ctx) => {
  const decodedReqBody = JSON.parse(decodeURIComponent(ctx.cookies.get('resume')))
  const { texDoc, opts } = generateTex(decodedReqBody)
  const zip = Archiver('zip')

  zip.on('error', (err) => {
    ctx.throw(400, err.message)
  })

  zip.append(prettify(texDoc), { name: 'resume.tex' })

  if (opts.inputs) {
    zip.directory(opts.inputs, 'inputs')
  }

  zip.finalize()

  ctx.attachment('resume.zip')
  ctx.type = 'application/zip'
  ctx.body = zip
})

module.exports = router
