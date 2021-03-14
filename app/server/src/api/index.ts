import Router from '@koa/router'
import { generateResumeTex, generateResumePdf } from './generator'
import { uploadJsonResume } from './uploader'

export const api = new Router({ prefix: '/api' })

api.post('/generate/tex', async ({ request, response }) => {
  const tex = generateResumeTex()
  response.body = tex
  response.status = 200
})

api.post('/generate/pdf', async ({ request, response }) => {
  response.body = generateResumePdf()
  response.status = 200
})

api.post('/upload/json', async ({ request, response }) => {
  const json = uploadJsonResume()
  console.log(json)
  response.status = 200
})
