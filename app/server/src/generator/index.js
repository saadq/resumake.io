const latex = require('node-latex')
const prettify = require('pretty-latex')
const Archiver = require('archiver')
const sanitize = require('./sanitizer')
const getTemplateData = require('./templates')

/**
 * Generates a LaTeX document from the request body,
 * and then generates a PDF from that document.
 *
 * @param {Object} formData - The request body received from the client.
 *
 * @return {TransformStream} - The generated PDF.
 */
function generatePDF(formData) {
  const { texDoc, opts } = generateTex(formData)
  const pdf = latex(texDoc, opts)

  return pdf
}

/**
 * Generates resume source files from the request body,
 * and then saves it to a zip which is then sent to the client.
 *
 * @param {Object} formData - The request body received from the client.
 *
 * @return {TransformStream} - The generated zip.
 */
function generateSourceCode(formData) {
  const { texDoc, opts } = generateTex(formData)
  const prettyDoc = prettify(texDoc)
  const zip = Archiver('zip')

  zip.append(prettyDoc, { name: 'resume.tex' })

  if (opts.inputs) {
    zip.directory(opts.inputs, '.')
  }

  zip.finalize()

  return zip
}

/**
 * Sanitizes the data in the request body and then generates
 * a LaTeX document based on the data and template chosen.
 *
 * @param {Object} formData - The request body received from the client.
 *
 * @return {Object} - An object which contains the generated LaTeX doc (texDoc)
 *                    as well as the opts needed to create a PDF from it (opts).
 */
function generateTex(formData) {
  const data = sanitize(formData)

  return getTemplateData(data)
}

module.exports = {
  generatePDF,
  generateSourceCode
}
