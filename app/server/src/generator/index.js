const latex = require('node-latex')
const sanitize = require('./sanitizer')
const getTemplateData = require('./templates')

function generateTex(formData) {
  const data = sanitize(formData)
  const { texDoc, opts } = getTemplateData(data)

  return { texDoc, opts }
}

function generatePDF(formData) {
  const { texDoc, opts } = generateTex(formData)

  return latex(texDoc, opts)
}

module.exports = {
  generateTex,
  generatePDF
}
