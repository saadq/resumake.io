const template1 = require('./template1')
const template2 = require('./template2')
const template3 = require('./template3')

function generateTemplate(data) {
  switch (data.selectedTemplate) {
    case 1: return template1(data)
    case 2: return template2(data)
    case 3: return template3(data)
  }
}

module.exports = generateTemplate
