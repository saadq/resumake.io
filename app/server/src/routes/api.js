/**
 * @flow
 */

import Router from 'koa-router'

const router = new Router({ prefix: '/api' })

router.get('/yo', async ctx => {
  ctx.body = { status: 'get success' }
})

router.post('/test', async ctx => {
  console.log(ctx.request.body)
  ctx.body = { status: 'post success' }
})

export default router
