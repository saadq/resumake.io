/**
 * @flow
 */

import { join } from 'path'
import template1 from './template1'
import template2 from './template2'
import template3 from './template3'
import template4 from './template4'
import template5 from './template5'
import template6 from './template6'
import template7 from './template7'
import template8 from './template8'
import template9 from './template9'
import {
  TEMPLATE1,
  TEMPLATE2,
  TEMPLATE3,
  TEMPLATE4,
  TEMPLATE5,
  TEMPLATE6,
  TEMPLATE7,
  TEMPLATE8,
  TEMPLATE9
} from './constants'
import type { SanitizedValues, TemplateData } from '../../types'

/**
 * Generates the LaTeX document based on the selected template
 * as well as the necessary options needed for it to create a
 * pdf via node-latex.
 *
 * @param data - The sanitized form data from the request body.
 *
 * @return The generated LaTeX document as well as its additional opts.
 */

function getTemplateData(data: SanitizedValues): TemplateData {
  switch (data.selectedTemplate) {
    case TEMPLATE1:
      return {
        texDoc: template1(data),
        opts: {
          cmd: 'pdflatex'
        }
      }

    case TEMPLATE2:
      return {
        texDoc: template2(data),
        opts: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'template2', 'inputs'),
          fonts: join(__dirname, 'template2', 'inputs')
        }
      }

    case TEMPLATE3:
      return {
        texDoc: template3(data),
        opts: {
          cmd: 'pdflatex'
        }
      }

    case TEMPLATE4:
      return {
        texDoc: template4(data),
        opts: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'template4', 'inputs'),
          fonts: join(__dirname, 'template4', 'inputs')
        }
      }

    case TEMPLATE5:
      return {
        texDoc: template5(data),
        opts: {
          cmd: 'pdflatex',
          inputs: join(__dirname, 'template5', 'inputs')
        }
      }

    case TEMPLATE6:
      return {
        texDoc: template6(data),
        opts: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'template6', 'inputs'),
          fonts: join(__dirname, 'template6', 'inputs')
        }
      }

    case TEMPLATE7:
      return {
        texDoc: template7(data),
        opts: {
          cmd: 'pdflatex',
          inputs: join(__dirname, 'template7', 'inputs')
        }
      }

    case TEMPLATE8:
      return {
        texDoc: template8(data),
        opts: {
          cmd: 'lualatex',
          inputs: join(__dirname, 'template8', 'inputs')
        }
      }

    case TEMPLATE9:
      return {
        texDoc: template9(data),
        opts: {
          cmd: 'pdflatex'
        }
      }

    default:
      return {
        texDoc: template1(data),
        opts: {
          cmd: 'pdflatex'
        }
      }
  }
}

export default getTemplateData
