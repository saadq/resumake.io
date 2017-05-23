const latex = require('node-latex')
const through = require('through2')
const sanitize = require('./sanitizer')
const getTemplateData = require('./templates')

/**
 * Sanitizes the form data received in the request body, and then
 * generates the LaTeX document as well as the necessary options
 * needed for it to create a pdf via node-latex.
 *
 * @param {Object} formData - The request body received from the client.
 *
 * @return {Object} - The generated LaTeX document as well as its additional opts.
 */
function generate(formData) {
  return new Promise((resolve, reject) => {
    const data = sanitize(formData)
    const { texDoc, opts } = getTemplateData(data)
    const output = through()
    const pdf = latex(texDoc, opts)

    pdf.pipe(output)
    pdf.on('finish', () => resolve(output))
    pdf.on('error', reject)
  })
}

module.exports = generate
