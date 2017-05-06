const { join } = require('path')
const template1 = require('./template1')
const template2 = require('./template2')
const template3 = require('./template3')
const { TEMPLATE1, TEMPLATE2, TEMPLATE3 } = require('../constants')

function getTemplateData(data) {
  switch (data.selectedTemplate) {
    case TEMPLATE1:
      return {
        texDoc: template1(data),
        opts: {}
      }

    case TEMPLATE2:
      console.log(template2(data))
      return {
        texDoc: template2(data),
        opts: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'template2', 'inputs'),
          fonts: join(__dirname, 'template2', 'inputs'),
          errorLogs: join(__dirname, 'latexerrors.log')
        }
      }

    case TEMPLATE3:
      return {
        texDoc: template3(data),
        opts: {}
      }
  }
}

module.exports = getTemplateData
