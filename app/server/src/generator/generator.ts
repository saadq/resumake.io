import latex, { LatexOptions } from 'node-latex'
import Archiver from 'archiver'
import { Transform } from 'stream'
import { stripIndent } from 'common-tags'
import { template1 } from './templates/template1/template1'
import { FormValues } from './types'

interface TemplateData {
  texDoc: string
  options: LatexOptions
}

export function generatePdf(formValues: FormValues) {
  const { texDoc, options } = generateTemplateData(formValues)
  return latex(texDoc, options)
}

export function generateSource(formValues: FormValues): Transform {
  const { texDoc, options } = generateTemplateData(formValues)
  const zip = Archiver('zip')
  const readme = generateReadme(formValues.selectedTemplate, options.cmd)

  zip.append(texDoc, { name: 'resume.tex' })
  zip.append(readme, { name: 'README.md' })

  if (options.inputs) {
    zip.directory(options.inputs as string, '../')
  }

  zip.finalize()

  return zip
}

export function generateTemplateData(formValues: FormValues): TemplateData {
  switch (formValues.selectedTemplate) {
    case 1:
      return {
        texDoc: template1(formValues),
        options: {}
      }

    case 2:
      return {
        texDoc: '',
        options: {}
      }

    case 3:
      return {
        texDoc: '',
        options: {}
      }

    case 4:
      return {
        texDoc: '',
        options: {}
      }

    case 5:
      return {
        texDoc: '',
        options: {}
      }

    case 6:
      return {
        texDoc: '',
        options: {}
      }

    case 7:
      return {
        texDoc: '',
        options: {}
      }
    case 8:
      return {
        texDoc: '',
        options: {}
      }

    case 9:
      return {
        texDoc: '',
        options: {}
      }

    case 10:
      return {
        texDoc: '',
        options: {}
      }

    default:
      return {
        texDoc: template1(formValues),
        options: {}
      }
  }
}

export function generateReadme(templateId: number, cmd = 'pdflatex') {
  return stripIndent`
    # Resumake Template ${templateId}
    > LaTeX code generated from [resumake.io](https://resumake.io)

    ## Usage
    To generate a PDF from this LaTeX code, navigate to this folder in a terminal and run:

        ${cmd} resume.tex

    ## Requirements
    You will need to have \`${cmd}\` installed on your machine.
    Alternatively, you can use a site like [ShareLaTeX](https://sharelatex.com) to build and edit your LaTeX instead.
  `
}
