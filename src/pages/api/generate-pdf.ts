import type { NextApiRequest, NextApiResponse } from 'next'
import latex from 'node-latex'
import fs from 'fs'
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

function escapeLatexSpecialChars(str: string): string {
  return str
    .replace(/\\/g, '\\textbackslash')
    .replace(/#/g, '\\#')
    .replace(/\$/g, '\\$')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde')
    .replace(/\^/g, '\\textasciicircum');
}

function cleanData(data: FormValues): FormValues {
  data.projects?.forEach((project) => {
    project.highlights = project.highlights?.map(highlight =>
      escapeLatexSpecialChars(highlight)
    );
  });

  data.work?.forEach((work) => {
    work.highlights = work.highlights?.map(highlight =>
      escapeLatexSpecialChars(highlight)
    );
  });

  return data;
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
  const cleanedData = cleanData(formData)
  const { texDoc, opts } = getTemplateData(cleanedData)
  try {
    // Save tex fike
    fs.writeFileSync('resume.tex', texDoc)
    const pdf = latex(texDoc, opts)
    return pdf
  } catch (err) {
    console.log(`Error generating PDF for template ${formData.selectedTemplate}`)
    // Return Blank pdf
    return latex('', opts)
  }
}
