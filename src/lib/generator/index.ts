import template1 from './template1'
import { TEMPLATE1 } from './constants'
import { FormValues } from '../../types'
import { TemplateData } from '../../types'

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

    default:
      return {
        texDoc: template1(data),
        opts: {
          cmd: 'tectonic'
        }
      }
  }
}
