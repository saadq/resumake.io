import test from 'ava'
import request from 'supertest'
import app from '..'

test('/api/generate/resume -> it should generate a PDF', async t => {
  const data = {
    template: 1,
    profile: {
      fullName: 'Saad Quadri',
      email: 'saad@saadq.com',
      link: 'github.com/saadq'
    }
  }

  const response = await request(app.listen())
    .post('/api/generate/resume')
    .set('Accept', 'application/pdf')
    .set('Content-Type', 'application/json')
    .send(data)
    .expect('Content-Type', 'application/pdf')
    .expect(200)

  t.truthy(response)
  t.truthy(response.text)
  t.true(typeof response.text === 'string')
  t.true(response.text.length > 0)
})

test('/api/generate/source -> it should generate source code zip', async t => {
  const data = {
    template: 2,
    profile: {
      fullName: 'Saad Quadri',
      email: 'saad@saadq.com',
      link: 'github.com/saadq'
    }
  }

  const response = await request(app.listen())
    .post('/api/generate/source')
    .set('Accept', 'application/octet-stream')
    .set('Content-Type', 'application/json')
    .send(data)
    .expect('Content-Type', 'application/zip')
    .expect(200)

  t.truthy(response)
  t.truthy(response.body)
})
