import type { NextApiRequest, NextApiResponse } from 'next'
import Archiver from 'archiver'
import { stripIndent } from 'common-tags'
import getTemplateData from '../../lib/templates'
import { FormValues } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://resumake.art3m1s.me');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).end();
    return
  }

  try {
    const sourceCode = await generateSourceCode(req.body as FormValues);

    sourceCode
      .pipe(res)
      .on('error', (err) => {
        res.status(500).end();
      });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.zip"');
  } catch (err) {
    res.status(500).end();
  }
}

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
  data.projects?.forEach((project) => {
    project.highlights = project.highlights?.map(highlight =>
      escapeLatexSpecialCharsAndMarkdown(highlight)
    );
  });

  data.work?.forEach((work) => {
    work.highlights = work.highlights?.map(highlight =>
      escapeLatexSpecialCharsAndMarkdown(highlight)
    );
  });

  return data;
}

/**
 * Generates resume source files from the request body,
 * and then saves it to a zip which is then sent to the client.
 *
 * @param formData The request body received from the client.
 *
 * @return The generated zip.
 */
function generateSourceCode(formData: FormValues) {
  const cleanedData = cleanData(formData)
  const { texDoc, opts } = getTemplateData(cleanedData)
  const prettyDoc = /*prettify(texDoc)*/ texDoc
  const zip = Archiver('zip')
  const readme = makeReadme(formData.selectedTemplate, opts.cmd)

  zip.append(prettyDoc, { name: 'resume.tex' })
  zip.append(readme, { name: 'README.md' })

  if (opts.inputs) {
    zip.directory(opts.inputs, '../')
  }

  zip.finalize()

  return zip
}

/**
 * Generates a README to include in the output zip.
 * It details how to use the generated LaTeX source code.
 *
 * @param template The specified resume template.
 * @param cmd The LaTeX command that is used to generate the PDF.
 *
 * @return The generated README text.
 */
function makeReadme(template: number, cmd: string): string {
  return stripIndent`
    # Resumake Template ${template}
    > LaTeX code generated at [resumake.io](https://resumake.io)
    ## Usage
    To generate a PDF from this LaTeX code, navigate to this folder in a terminal and run:
        ${cmd} resume.tex
    ## Requirements
    You will need to have \`${cmd}\` installed on your machine.
    Alternatively, you can use a site like [ShareLaTeX](https://sharelatex.com) to build and edit your LaTeX instead.
  `
}
