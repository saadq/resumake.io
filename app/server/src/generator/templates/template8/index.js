/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues, Generator } from '../../../types'

type Template8Generator = Generator & {
  resumeHeader: () => string
}

const generator: Template8Generator = {
  profileSection(basics) {
    if (!basics) {
      return ''
    }

    const { name, email, phone = '', location = {}, website = '' } = basics

    let addressLine = ''
    let contactsLine = ''

    if (location.address && phone) {
      addressLine = `\\address{${location.address} \\linebreak ${phone}}`
    } else if (location.address || phone) {
      addressLine = `\\address{${location.address || phone}}`
    }

    if (email && website) {
      contactsLine = `\\contacts{${email} \\linebreak ${website}}`
    } else if (email || website) {
      contactsLine = `\\contacts{${email || website}}`
    }

    return `
      % Set applicant's personal data for header
      \\name{${name || ''}}
      ${addressLine}
      ${contactsLine}
    `
  },

  aboutSection(basics, heading) {
    if (!basics || !basics.summary) {
      return ''
    }

    return source`
      \\begin{cvsection}{${heading || 'About'}}
      \\begin{cvsubsection}{}{}{}
      ${basics.summary}
      \\end{cvsubsection}
      \\end{cvsection}
    `
  },

  educationSection(education, heading) {
    if (!education) {
      return ''
    }

    return source`
      \\begin{cvsection}{${heading || 'Education'}}
      ${education.map(school => {
        const {
          institution,
          studyType = '',
          area = '',
          gpa,
          location,
          startDate,
          endDate
        } = school

        let degreeLine = ''

        if (studyType && area) {
          degreeLine = `${studyType} in ${area}.`
        } else if (studyType || area) {
          degreeLine = (studyType || area) + '.'
        }

        let dateRange = ''

        if (startDate && endDate) {
          dateRange = `${startDate} | ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} | Present`
        } else {
          dateRange = endDate
        }

        if (gpa) {
          degreeLine += ` GPA: ${gpa}`
        }

        return stripIndent`
          \\begin{cvsubsection}{${location || ''}}{${institution ||
          ''}}{${dateRange || ''}}
            \\begin{itemize}
              \\item ${degreeLine}
            \\end{itemize}
          \\end{cvsubsection}
        `
      })}
      \\end{cvsection}
    `
  },

  workSection(work, heading) {
    if (!work) {
      return ''
    }

    return source`
      \\begin{cvsection}{${heading || 'Experience'}}
      ${work.map(job => {
        const {
          company,
          position,
          location,
          startDate,
          endDate,
          highlights
        } = job

        let dateRange = ''
        let highlightLines = ''

        if (startDate && endDate) {
          dateRange = `${startDate} -- ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} -- Present`
        } else {
          dateRange = endDate
        }

        if (highlights) {
          highlightLines = source`
            \\begin{itemize}%
              ${highlights.map(highlight => `\\item ${highlight}`)}
            \\end{itemize}
            `
        }

        return stripIndent`
          \\begin{cvsubsection}{${position || ''}}{${company ||
          ''}}{${dateRange || ''}}
            ${location || ''}
            ${highlightLines || ''}
          \\end{cvsubsection}
        `
      })}
      \\end{cvsection}
    `
  },

  skillsSection(skills, heading) {
    if (!skills) {
      return ''
    }

    return source`
      \\begin{cvsection}{${heading || 'Skills'}}
      \\begin{cvsubsection}{}{}{}
      \\begin{itemize}
      ${skills.map(skill => {
        const { name, keywords = [] } = skill
        return `\\item ${name ? `${name}: ` : ''} ${keywords.join(', ') || ''}`
      })}
      \\end{itemize}
      \\end{cvsubsection}
      \\end{cvsection}
    `
  },

  projectsSection(projects, heading) {
    if (!projects) {
      return ''
    }

    return source`
      \\begin{cvsection}{${heading || 'Projects'}}
      \\begin{cvsubsection}{}{}{}
      \\begin{itemize}
      \\setlength\\itemsep{3pt}
      ${projects.map(project => {
        const { name, description, keywords = [], url } = project

        let line = ''

        if (name) {
          line += `\\textbf{${name}} `
        }

        if (url) {
          line += `(${url}) `
        }

        if (description) {
          line += ` ${description}`
        }

        if (keywords) {
          line += ` ${keywords.join(', ')}`
        }

        return `\\item ${line}`
      })}
      \\end{itemize}
      \\end{cvsubsection}
      \\end{cvsection}
    `
  },

  awardsSection(awards, heading) {
    if (!awards) {
      return ''
    }

    return source`
      \\begin{cvsection}{${heading || 'Awards'}}
      \\begin{cvsubsection}{}{}{}
      \\begin{itemize}
      \\setlength\\itemsep{3pt}
      ${awards.map(award => {
        const { title, summary, date, awarder } = award

        let line = ''

        if (title) {
          line += `\\textbf{${title}} `
        }

        if (awarder) {
          line += `(${awarder}) `
        }

        if (summary) {
          line += ` ${summary}`
        }

        if (date) {
          line += ` ${date}`
        }

        return `\\item ${line}`
      })}
      \\end{itemize}
      \\end{cvsubsection}
      \\end{cvsection}
    `
  },

  resumeHeader() {
    return stripIndent`
      %% The MIT License (MIT)
      %%
      %% Copyright (c) 2015 Daniil Belyakov
      %%
      %% Permission is hereby granted, free of charge, to any person obtaining a copy
      %% of this software and associated documentation files (the "Software"), to deal
      %% in the Software without restriction, including without limitation the rights
      %% to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      %% copies of the Software, and to permit persons to whom the Software is
      %% furnished to do so, subject to the following conditions:
      %%
      %% The above copyright notice and this permission notice shall be included in all
      %% copies or substantial portions of the Software.
      %%
      %% THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      %% IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      %% FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      %% AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      %% LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      %% OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      %% SOFTWARE.
    `
  }
}

function template8(values: SanitizedValues) {
  const { headings = {} } = values

  return stripIndent`
    ${generator.resumeHeader()}
    % The font could be set to Windows-specific Calibri by using the 'calibri' option
    \\documentclass[]{mcdowellcv}

    % For mathematical symbols
    \\usepackage{amsmath}

    ${generator.profileSection(values.basics)}

    \\begin{document}
      % Print the header
      \\makeheader
      ${values.sections
        .map(section => {
          switch (section) {
            case 'about':
              return generator.aboutSection
                ? generator.aboutSection(values.basics, headings.about)
                : ''

            case 'education':
              return generator.educationSection(
                values.education,
                headings.education
              )

            case 'work':
              return generator.workSection(values.work, headings.work)

            case 'skills':
              return generator.skillsSection(values.skills, headings.skills)

            case 'projects':
              return generator.projectsSection(
                values.projects,
                headings.projects
              )

            case 'awards':
              return generator.awardsSection(values.awards, headings.awards)

            default:
              return ''
          }
        })
        .join('\n')}
      ${WHITESPACE}
    \\end{document}
  `
}

export default template8
