/**
 * @flow
 */

import latex from 'node-latex'
import prettify from 'pretty-latex'
import Archiver from 'archiver'
import getTemplateData from './templates'
import type { SanitizedValues } from '../types'

/**
 * Generates a LaTeX document from the request body,
 * and then generates a PDF from that document.
 *
 * @param {Object} formData - The request body received from the client.
 *
 * @return {TransformStream} - The generated PDF.
 */

function generatePDF(formData: SanitizedValues) {
  const { texDoc, opts } = getTemplateData(formData)
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

function generateSourceCode(formData: SanitizedValues) {
  const { texDoc, opts } = getTemplateData(formData)
  const prettyDoc = prettify(texDoc)
  const zip = Archiver('zip')

  zip.append(prettyDoc, { name: 'resume.tex' })

  if (opts.inputs) {
    zip.directory(opts.inputs, '../')
  }

  zip.finalize()

  return zip
}

export { generatePDF, generateSourceCode }
