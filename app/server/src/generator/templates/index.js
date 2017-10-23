const { join } = require('path')
const template1 = require('./template1')
const template2 = require('./template2')
const template3 = require('./template3')
const template4 = require('./template4')
const template5 = require('./template5')
const template6 = require('./template6')
const template7 = require('./template7')
const template8 = require('./template8')
const template9 = require('./template9')
const {
  TEMPLATE1,
  TEMPLATE2,
  TEMPLATE3,
  TEMPLATE4,
  TEMPLATE5,
  TEMPLATE6,
  TEMPLATE7,
  TEMPLATE8,
  TEMPLATE9
} = require('./constants')

/**
 * Generates the LaTeX document based on the selected template
 * as well as the necessary options needed for it to create a
 * pdf via node-latex.
 *
 * @param {Object} data - The sanitized form data from the request body.
 *
 * @return {Object} - The generated LaTeX document as well as its additional opts.
 */

function getTemplateData(data) {
  switch (data.template) {
    case TEMPLATE1:
      return {
        texDoc: template1(data),
        opts: {}
      }

    case TEMPLATE2:
      return {
        texDoc: template2(data),
        opts: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'template2', 'inputs'),
          fonts: join(__dirname, 'template2', 'inputs')
        }
      }

    case TEMPLATE3:
      return {
        texDoc: template3(data),
        opts: {}
      }

    case TEMPLATE4:
      return {
        texDoc: template4(data),
        opts: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'template4', 'inputs'),
          fonts: join(__dirname, 'template4', 'inputs')
        }
      }

    case TEMPLATE5:
      return {
        texDoc: template5(data),
        opts: {
          inputs: join(__dirname, 'template5', 'inputs')
        }
      }

    case TEMPLATE6:
      return {
        texDoc: template6(data),
        opts: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'template6', 'inputs'),
          fonts: join(__dirname, 'template6', 'inputs'),
          passes: 2
        }
      }

    case TEMPLATE7:
      return {
        texDoc: template7(data),
        opts: {
          inputs: join(__dirname, 'template7', 'inputs')
        }
      }

    case TEMPLATE8:
      return {
        texDoc: template8(data),
        opts: {
          cmd: 'lualatex',
          inputs: join(__dirname, 'template8', 'inputs')
        }
      }

    case TEMPLATE9:
      return {
        texDoc: template9(data),
        opts: {}
      }
  }
}

module.exports = getTemplateData
