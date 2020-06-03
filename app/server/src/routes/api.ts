import Router from '@koa/router'

export const api = new Router()

api.post('/generate/pdf', async ({ response }) => {
  response.type = 'application/pdf'
})

api.post('/generate/source', async ({ response }) => {
  response.type = 'application/zip'
})

api.post('/upload/json', async ({ response }) => {
  response.type = 'application/json'
})
