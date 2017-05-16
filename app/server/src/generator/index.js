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
  const data = sanitize(formData)
  const { texDoc, opts } = getTemplateData(data)

  return { texDoc, opts }
}

module.exports = generate
