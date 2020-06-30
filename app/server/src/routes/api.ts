import Router from '@koa/router'
import latex from 'node-latex'
import { sanitizer } from '../middleware/sanitizer'
import { generateTex } from '../generator/generator'

export const api = new Router({ prefix: '/api' })

api.post('/generate/tex', async ({ request, response }) => {
  const tex = generateTex(request.body)
  response.body = tex
  response.type = 'application/zip'
})

api.post('/generate/pdf', sanitizer(), async ({ request, response }) => {
  const tex = generateTex(request.body)
  const pdf = latex(tex)
  response.body = pdf
  response.type = 'application/pdf'
})

api.post('/upload/json', async ({ request, response }) => {
  response.body = {}
  response.type = 'application/json'
})
