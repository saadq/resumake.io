import type { NextApiRequest, NextApiResponse } from 'next'
import latex from 'node-latex'
import getTemplateData from '../../lib/templates'
import { FormValues } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405)
    return
  }

  const pdf = await generatePDF(req.body as FormValues)
  pdf.pipe(res)
  res.setHeader('Content-Type', 'application/pdf')
}

/**
 * Generates a LaTeX document from the request body,
 * and then generates a PDF from that document.
 *
 * @param formData The request body received from the client.
 *
 * @return The generated PDF.
 */
async function generatePDF(formData: FormValues) {
  const { texDoc, opts } = getTemplateData(formData)
  const pdf = await latex(texDoc, opts)

  return pdf
}
