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
import { FormValues, TemplateData } from '../../types'

/**
 * Generates the LaTeX document based on the selected template
 * as well as the necessary options needed for it to create a pdf.
 *
 * @param data - The sanitized form data from the request body.
 *
 * @return The generated LaTeX document as well as its additional opts.
 */
export default function getTemplateData(data: FormValues): TemplateData {

  function escapeLatexSpecialCharsAndMarkdown(str: string): string {
    // Escape LaTeX special characters (excluding asterisks)
    let escapedStr = str
      .replace(/\\/g, '\\textbackslash ')
      .replace(/#/g, '\\#')
      .replace(/\$/g, '\\$')
      .replace(/%/g, '\\%')
      .replace(/&/g, '\\&')
      .replace(/_/g, '\\_')
      .replace(/{/g, '\\{')
      .replace(/}/g, '\\}')
      .replace(/~/g, '\\textasciitilde')
      .replace(/\^/g, '\\textasciicircum');

    // Replace Markdown bold and italics
    // The non-greedy regex (.*?) ensures it matches the shortest possible string
    escapedStr = escapedStr
      .replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}')
      .replace(/\*(.*?)\*/g, '\\textit{$1}');

    return escapedStr;
  }

  function cleanData(data: FormValues): FormValues {
    const dataCopy: FormValues = JSON.parse(JSON.stringify(data));

    dataCopy.projects?.forEach((project) => {
      project.highlights = project.highlights?.map(highlight =>
        escapeLatexSpecialCharsAndMarkdown(highlight)
      );
    });

    dataCopy.work?.forEach((work) => {
      work.highlights = work.highlights?.map(highlight =>
        escapeLatexSpecialCharsAndMarkdown(highlight)
      );
    });

    return dataCopy;
  }

  const cleanedData = cleanData(data);

  switch (cleanedData.selectedTemplate) {
    case TEMPLATE1:
      return {
        texDoc: template1(cleanedData),
        opts: {
          cmd: 'pdflatex'
        }
      }

    case TEMPLATE2:

      return {
        texDoc: template2(cleanedData),
        opts: {
          cmd: 'xelatex',
          inputs: [
            '/templates/template2/awesome-cv.cls',
            '/templates/template2/fontawesome.sty'
          ],
          fonts: [
            '/templates/template2/fonts/FontAwesome.otf',
            '/templates/template2/fonts/Roboto-Bold.ttf',
            '/templates/template2/fonts/Roboto-BoldItalic.ttf',
            '/templates/template2/fonts/Roboto-Italic.ttf',
            '/templates/template2/fonts/Roboto-Light.ttf',
            '/templates/template2/fonts/Roboto-LightItalic.ttf',
            '/templates/template2/fonts/Roboto-Medium.ttf',
            '/templates/template2/fonts/Roboto-MediumItalic.ttf',
            '/templates/template2/fonts/Roboto-Regular.ttf',
            '/templates/template2/fonts/Roboto-Thin.ttf',
            '/templates/template2/fonts/Roboto-ThinItalic.ttf',
            '/templates/template2/fonts/SourceSansPro-Bold.otf',
            '/templates/template2/fonts/SourceSansPro-BoldIt.otf',
            '/templates/template2/fonts/SourceSansPro-It.otf',
            '/templates/template2/fonts/SourceSansPro-Light.otf',
            '/templates/template2/fonts/SourceSansPro-LightIt.otf',
            '/templates/template2/fonts/SourceSansPro-Regular.otf',
            '/templates/template2/fonts/SourceSansPro-Semibold.otf',
            '/templates/template2/fonts/SourceSansPro-SemiboldIt.otf'
          ]
        }
      }

    case TEMPLATE3:
      return {
        texDoc: template3(cleanedData),
        opts: {
          cmd: 'pdflatex'
        }
      }

    case TEMPLATE4:
      return {
        texDoc: template4(cleanedData),
        opts: {
          cmd: 'xelatex',
          inputs: ['/templates/template4/deedy-resume-openfont.cls'],
          fonts: [
            '/templates/template4/fonts/Raleway-Bold.otf',
            '/templates/template4/fonts/Raleway-ExtraBold.otf',
            '/templates/template4/fonts/Raleway-ExtraLight.otf',
            '/templates/template4/fonts/Raleway-Heavy.otf',
            '/templates/template4/fonts/Raleway-Light.otf',
            '/templates/template4/fonts/Raleway-Medium.otf',
            '/templates/template4/fonts/Raleway-Regular.otf',
            '/templates/template4/fonts/Raleway-SemiBold.otf',
            '/templates/template4/fonts/Raleway-Thin.otf'
          ]
        }
      }

    case TEMPLATE5:
      return {
        texDoc: template5(cleanedData),
        opts: {
          cmd: 'xelatex',
          inputs: [
            '/templates/template5/helvetica.sty',
            '/templates/template5/res.cls'
          ]
        }
      }

    case TEMPLATE6:
      return {
        texDoc: template6(cleanedData),
        opts: {
          cmd: 'xelatex',
          inputs: [
            '/templates/template6/custom-command.tex',
            '/templates/template6/minimal-resume-config.tex',
            '/templates/template6/minimal-resume.sty'
          ],
          fonts: [
            '/templates/template6/fonts/CrimsonText-Bold.ttf',
            '/templates/template6/fonts/CrimsonText-BoldItalic.ttf',
            '/templates/template6/fonts/CrimsonText-Italic.ttf',
            '/templates/template6/fonts/CrimsonText-Regular.ttf',
            '/templates/template6/fonts/CrimsonText-Roman.ttf',
            '/templates/template6/fonts/CrimsonText-SemiBold.ttf',
            '/templates/template6/fonts/CrimsonText-SemiBoldItalic.ttf',
            '/templates/template6/fonts/Montserrat-Bold.ttf',
            '/templates/template6/fonts/Montserrat-Light.otf',
            '/templates/template6/fonts/Montserrat-Regular.ttf'
          ]
        }
      }

    case TEMPLATE7:
      return {
        texDoc: template7(cleanedData),
        opts: {
          cmd: 'pdflatex',
          inputs: [
            '/templates/template7/collection.sty',
            '/templates/template7/moderncv.cls',
            '/templates/template7/moderncvcolorblue.sty',
            '/templates/template7/moderncviconsletters.sty',
            '/templates/template7/moderncviconsmarvosym.sty',
            '/templates/template7/moderncvstyleclassic.sty',
            '/templates/template7/tweaklist.sty'
          ]
        }
      }

    case TEMPLATE8:
      return {
        texDoc: template8(cleanedData),
        opts: {
          cmd: 'xelatex',
          inputs: ['/templates/template8/mcdowellcv.cls']
        }
      }

    case TEMPLATE9:
      return {
        texDoc: template9(cleanedData),
        opts: {
          cmd: 'pdflatex'
        }
      }

    default:
      return {
        texDoc: template1(cleanedData),
        opts: {
          cmd: 'pdflatex'
        }
      }
  }
}
