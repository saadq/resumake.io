/**
 * @flow
 */

import request from 'supertest'
import app from '../src'

describe('/api/generate/resume', () => {
  test('it should generate a PDF', async () => {
    const data = {
      selectedTemplate: 1,
      basics: {
        name: 'Saad Quadri',
        email: 'saad@saadq.com',
        website: 'github.com/saadq'
      },
      orderedSections: [
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
})

describe('/api/generate/source', () => {
  test('it should generate a zip of the LaTeX source code', async () => {
    const data = {
      selectedTemplate: 1,
      basics: {
        name: 'Saad Quadri',
        email: 'saad@saadq.com',
        website: 'github.com/saadq'
      },
      orderedSections: [
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
})
