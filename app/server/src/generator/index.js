const latex = require('node-latex')
const generateTemplate = require('./templates')

function generateTex(formData) {
  const data = sanitizeInputs(formData)
  const template = generateTemplate(data)

  return template
}

function generatePDF(formData) {
  const texDoc = generateTex(formData)

  return latex(texDoc)
}

function sanitizeInputs(formData) {
  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      return
    }

    if (typeof formData[key] === 'object') {
      sanitizeInputs(formData[key])
      return
    }

    if (typeof formData[key] === 'number') {
      return
    }

    formData[key] = sanitizeStr(formData[key])
  })

  return formData
}

function sanitizeStr(str) {
  const symbolMap = {
    '\\': '\\textbackslash{}',
    '^': '\\textasciicircum{}',
    '~': '\\textasciitilde{}',
    '{': '\\{',
    '}': '\\}',
    '$': '\\$',
    '&': '\\&',
    '#': '\\#',
    '_': '\\_',
    '%': '\\%'
  }

  const symbols = Object.keys(symbolMap)

  return Array.from(str)
    .map(char => symbols.includes(char) ? symbolMap[char] : char)
    .join('')
}

module.exports = {
  generateTex,
  generatePDF
}
