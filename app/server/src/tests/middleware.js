/**
 * @flow
 */

import { errorHandler, sanitizer, jsonResume } from '../middleware'
import { join } from 'path'

test('errorHandler should catch all errors downstream', async () => {
  const ctx: Object = {
    app: {
      emit: jest.fn()
    },
    request: {},
    response: {}
  }

  const next = jest.fn(() => {
    const err: Object = new Error('Bad user request')
    err.status = 400
    throw err
  })

  const middleware = errorHandler()
  await middleware(ctx, next)

  expect(next).toHaveBeenCalled()
  expect(ctx.response.status).toBe(400)
  expect(ctx.response.body).toBe('Bad user request')
})

test('sanitizer should normalize the request body', async () => {
  const ctx: Object = {
    request: {
      body: {
        selectedTemplate: 1,
        basics: {
          name: 'Saad Quadri',
          email: null,
          website: 'github.com/saadq'
        },
        education: [],
        work: [{ company: 'Johnson & Johnson' }],
        skills: []
      }
    },
    response: {}
  }

  const next = jest.fn()

  const expected = {
    selectedTemplate: 1,
    basics: {
      name: 'Saad Quadri',
      website: 'github.com/saadq'
    },
    work: [{ company: 'Johnson \\& Johnson' }]
  }

  const middleware = sanitizer()
  await middleware(ctx, next)

  expect(next).toHaveBeenCalled()
  expect(ctx.request.body).toEqual(expected)
})

test('jsonResume should validate and extract the JSON from file', async () => {
  const ctx: Object = {
    request: {
      files: {
        'json-file': {
          path: join(__dirname, 'utils', 'upload.json')
        }
      }
    },
    response: {},
    throw: jest.fn()
  }

  const next = jest.fn()

  const expected = {
    selectedTemplate: 1,
    headings: {},
    basics: {
      name: 'Saad Quadri',
      email: 'saad@saadq.com',
      website: 'github.com/saadq'
    },
    education: [],
    work: [{ highlights: [''] }],
    skills: [{ keywords: [''] }],
    projects: [{ keywords: [''] }],
    awards: []
  }

  const middleware = jsonResume()
  await middleware(ctx, next)

  expect(next).toHaveBeenCalled()
  expect(ctx.request.jsonResume).toEqual(expected)
})
