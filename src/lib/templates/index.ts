import path from 'node:path'
import template1 from './template1'
import template2 from './template2'
import template3 from './template3'
import template4 from './template4'
import template5 from './template5'
import {
  TEMPLATE1,
  TEMPLATE2,
  TEMPLATE3,
  TEMPLATE4,
  TEMPLATE5
} from './constants'
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

    case TEMPLATE3:
      return {
        texDoc: template3(data),
        opts: {
          cmd: 'tectonic'
        }
      }

    case TEMPLATE4:
      return {
        texDoc: template4(data),
        opts: {
          cmd: 'tectonic',
          inputs: path.resolve(
            process.cwd(),
            'src/lib/templates/template4/inputs'
          ),
          fonts: path.resolve(
            process.cwd(),
            'src/lib/templates/template4/inputs'
          )
        }
      }

    case TEMPLATE5:
      return {
        texDoc: template5(data),
        opts: {
          cmd: 'tectonic',
          inputs: path.resolve(
            process.cwd(),
            'src/lib/templates/template5/inputs'
          ),
          fonts: path.resolve(
            process.cwd(),
            'src/lib/templates/template5/inputs'
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
