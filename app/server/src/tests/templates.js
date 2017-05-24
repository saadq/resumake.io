import test from 'ava'
import getTemplateData from '../generator/templates'

test('it should generate a LaTeX document for each template', async t => {
  const templates = [1, 2, 3, 4, 5, 6, 7, 8]

  const data = {
    profile: {
      fullName: 'Saad Quadri',
      email: 'saad@saadq.com',
      link: 'github.com/saadq'
    }
  }

  templates.forEach(template => {
    data.template = template

    const { texDoc } = getTemplateData(data)

    t.truthy(texDoc)
    t.is(typeof texDoc, 'string')
  })
})
