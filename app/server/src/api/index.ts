import Router from '@koa/router'

export const api = new Router({ prefix: '/api' })

api.post('/generate/tex', async (ctx) => {
  ctx.status = 200
})

api.post('/generate/pdf', async (ctx) => {
  ctx.status = 200
})

api.post('/upload/json', async (ctx) => {
  ctx.status = 200
})
