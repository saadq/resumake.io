const Router = require('koa-router')
const { generatePDF } = require('../generator')

const router = new Router({ prefix: '/api' })

router.post('/generate/resume', async (ctx) => {
  const pdf = generatePDF(ctx.request.body)

  ctx.body = pdf
  ctx.type = 'application/pdf'
})

module.exports = router
