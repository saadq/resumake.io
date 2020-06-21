import Router from '@koa/router'
import { sanitizer } from '../middleware/sanitizer'

export const api = new Router({ prefix: '/api' })

api.use('/generate', sanitizer())

api.post('/generate/pdf', async ({ response }) => {
  response.type = 'application/pdf'
})

api.post('/generate/source', async ({ response }) => {
  response.type = 'application/zip'
})
