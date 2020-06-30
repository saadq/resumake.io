import Router from '@koa/router'
import { sanitizer } from '../middleware/sanitizer'
import { generatePdf, generateSource } from '../generator/generator'

export const api = new Router({ prefix: '/api' })

api.post('/generate/source', async ({ request, response }) => {
  response.body = generateSource(request.body)
  response.type = 'application/zip'
})

api.post('/generate/pdf', sanitizer(), async ({ request, response }) => {
  response.body = generatePdf(request.body)
  response.type = 'application/pdf'
})
