/**
 * @flow
 */

import request from 'supertest'
import { join } from 'path'
import app from '..'

test('POST /api/generate/resume should generate a PDF', async () => {
  const data = {
    selectedTemplate: 1,
    basics: {
      name: 'Saad Quadri',
      email: 'saad@saadq.com',
      website: 'github.com/saadq'
    },
    sections: [
      'templates',
      'profile',
      'education',
      'work',
      'skills',
      'projects',
      'awards'
    ]
  }

  const response = await request(app.callback())
    .post('/api/generate/resume')
    .set('Accept', 'application/pdf')
    .set('Content-Type', 'application/json')
    .send(data)
    .expect('Content-Type', 'application/pdf')
    .expect(200)

  expect(response).toBeTruthy()
  expect(response.body).toBeTruthy()
  expect(Buffer.isBuffer(response.body)).toBeTruthy()
})

test('POST /api/generate/source should generate a zip of the LaTeX source code', async () => {
  const data = {
    selectedTemplate: 1,
    basics: {
      name: 'Saad Quadri',
      email: 'saad@saadq.com',
      website: 'github.com/saadq'
    },
    sections: [
      'templates',
      'profile',
      'education',
      'work',
      'skills',
      'projects',
      'awards'
    ]
  }

  const response = await request(app.callback())
    .post('/api/generate/source')
    .set('Accept', 'application/zip')
    .set('Content-Type', 'application/json')
    .send(data)
    .expect('Content-Type', 'application/zip')
    .expect(200)

  expect(response).toBeTruthy()
})

test('POST /api/upload should return the JSON from a file upload', async () => {
  const response = await request(app.callback())
    .post('/api/upload')
    .set('Accept', 'application/json')
    .attach('json-file', join(__dirname, 'utils', 'upload.json'))
    .expect('Content-Type', /json/)
    .expect(200)

  const expectedJSON = {
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

  expect(response).toBeTruthy()
  expect(response.body).toEqual(expectedJSON)
})
