/**
 * @flow
 */

import { stripIndent } from 'common-tags'
import { makeReadme } from '../generator'

test('makeReadme should work for all templates', () => {
  const templates = [
    { id: 1, cmd: 'pdflatex' },
    { id: 2, cmd: 'xelatex' },
    { id: 3, cmd: 'pdflatex' },
    { id: 4, cmd: 'xelatex' },
    { id: 5, cmd: 'pdflatex' },
    { id: 6, cmd: 'xelatex' },
    { id: 7, cmd: 'pdflatex' },
    { id: 8, cmd: 'lualatex' },
    { id: 9, cmd: 'pdflatex' }
  ]

  templates.forEach(template => {
    const expected = stripIndent`
      # Resumake Template ${template.id}
      > LaTeX code generated at [resumake.io](https://resumake.io)

      ## Usage
      To generate a PDF from this LaTeX code, navigate to this folder in a terminal and run:

          ${template.cmd} resume.tex

      ## Requirements
      You will need to have \`${template.cmd}\` installed on your machine.

      Alternatively, you can use a site like [ShareLaTeX](https://sharelatex.com) to build and edit your LaTeX instead.
    `

    const actual = makeReadme(template.id, template.cmd)

    expect(actual).toBe(expected)
  })
})
