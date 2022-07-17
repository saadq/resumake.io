import path from 'node:path'
import template1 from './template1'
import template2 from './template2'
import { TEMPLATE1, TEMPLATE2 } from './constants'
import { FormValues, TemplateData } from '../../types'

/**
 * Generates the LaTeX document based on the selected template
 * as well as the necessary options needed for it to create a
 * pdf via node-latex.
 *
 * @param data - The sanitized form data from the request body.
 *
 * @return The generated LaTeX document as well as its additional opts.
 */
export default function getTemplateData(data: FormValues): TemplateData {
  switch (data.selectedTemplate) {
    case TEMPLATE1:
      return {
        texDoc: template1(data),
        opts: {
          cmd: 'tectonic'
        }
      }

    case TEMPLATE2:
      return {
        texDoc: template2(data),
        opts: {
          cmd: 'tectonic',
          inputs: path.resolve(
            process.cwd(),
            'src/lib/templates/template2/inputs'
          ),
          fonts: path.resolve(
            process.cwd(),
            'src/lib/templates/template2/inputs'
          )
        }
      }

    default:
      return {
        texDoc: template1(data),
        opts: {
          cmd: 'tectonic'
        }
      }
  }
}
