import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from './constants'
import type { FormValues, Generator } from '../../types'

const generator: Omit<Generator, 'resumeHeader'> = {
  profileSection(basics) {
    if (!basics) {
      return ''
    }

    const { name, email, phone, location = {}, website } = basics
    const websiteLine = website ? `\\href{${website}}{${website}}` : ''

    const info = [email, phone, location.address, websiteLine]
      .filter(Boolean)
      .join(' | ')

    return stripIndent`
      \\name{{\\LARGE ${name || ''}}}
      \\address{${info}}
    `
  },

  educationSection(education, heading) {
    if (!education) {
      return ''
    }

    const lastSchoolIndex = education.length - 1

    return source`
      \\section{${heading || 'EDUCATION'}}
      ${education.map((school, i) => {
        const {
          institution,
          location,
          studyType = '',
          area = '',
          score,
          startDate,
          endDate = ''
        } = school

        let schoolLine = ''
        let degreeLine = ''

        if (institution) {
          schoolLine += `\\textbf{${institution}}, `
        }

        if (studyType && area) {
          degreeLine = `${studyType} in ${area}`
        } else if (studyType || area) {
          degreeLine = studyType || area
        }

        if (degreeLine) {
          schoolLine += `{\\sl ${degreeLine}} `
        }

        if (score) {
          schoolLine += `GPA: ${score}`
        }

        let dateRange = ''

        if (startDate && endDate) {
          dateRange = `${startDate} | ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} | Present`
        } else {
          dateRange = endDate
        }

        if (dateRange) {
          schoolLine += `\\hfill ${dateRange}`
        }

        if (schoolLine) {
          schoolLine += '\\\\'
        }

        if (location) {
          schoolLine += `${location}`
        }

        if (i !== lastSchoolIndex) {
          schoolLine += '\\\\\\\\'
        }

        return schoolLine
      })}
    `
  },

  workSection(work, heading) {
    if (!work) {
      return ''
    }

    return source`
      \\section{${heading || 'EXPERIENCE'}}
      ${work.map((job) => {
        const {
          name,
          position,
          location,
          startDate,
          endDate = '',
          highlights
        } = job

        let jobLine = ''
        let dateRange = ''

        if (name) {
          jobLine += `\\textbf{${name}}, `
        }

        if (position) {
          jobLine += `{\\sl ${position}}`
        }

        if (startDate && endDate) {
          dateRange = `${startDate} | ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} | Present`
        } else {
          dateRange = endDate
        }

        if (dateRange) {
          jobLine += `\\hfill ${dateRange}`
        }

        if (jobLine) {
          jobLine += '\\\\'
        }

        if (location) {
          jobLine += `${location}\\\\`
        }

        if (highlights) {
          jobLine += source`
            \\begin{itemize} \\itemsep 3pt
            ${highlights.map((highlight) => `\\item ${highlight}`)}
            \\end{itemize}
          `
        }

        return jobLine
      })}
    `
  },

  skillsSection(skills, heading) {
    if (!skills) {
      return ''
    }

    return source`
      \\section{${heading || 'SKILLS'}}
      \\begin{tabular}{@{}ll}
      ${skills.map((skill) => {
        const { name, keywords = [] } = skill
        return `\\textbf{${name || ''}}: & ${keywords.join(', ') || ''}\\\\`
      })}
      \\end{tabular}
    `
  },

  projectsSection(projects, heading) {
    if (!projects) {
      return ''
    }

    return source`
      \\section{${heading || 'PROJECTS'}}
      ${projects.map((project) => {
        const { name, description, keywords = [], url } = project

        let projectLine = ''

        if (name) {
          projectLine += `\\textbf{${name}}`
        }

        if (keywords) {
          projectLine += `, {\\sl ${keywords.join(', ')}}`
        }

        if (description) {
          projectLine += projectLine ? `\\\\ ${description}` : description
        }

        if (url) {
          const urlLine = url ? `\\href{${url}}{${url}}` : ''
          projectLine += projectLine ? `\\\\ ${urlLine}` : urlLine
        }

        if (projectLine) {
          projectLine += '\\\\\\\\'
        }

        return projectLine
      })}
    `
  },

  awardsSection(awards, heading) {
    if (!awards) {
      return ''
    }

    return source`
      \\section{${heading || 'AWARDS'}}
      ${awards.map((award) => {
        const { title, summary, date, awarder } = award

        return stripIndent`
            \\textbf{${title || ''}}, {\\sl ${awarder || ''}} \\hfill ${
          date || ''
        } \\\\
            ${summary || ''} \\\\\\\\
        `
      })}
    `
  }
}

function template5(values: FormValues) {
  const { headings = {} } = values

  return stripIndent`
    \\documentclass[line,margin]{res}
    \\usepackage[none]{hyphenat}
    \\usepackage{textcomp}
    \\usepackage[utf8]{inputenc}
    \\usepackage[T1]{fontenc}
    \\usepackage[hidelinks]{hyperref}
    \\begin{document}
      ${generator.profileSection(values.basics)}
      \\begin{resume}
        \\vspace{-5mm}
        ${values.sections
          .map((section) => {
            switch (section) {
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
      \\end{resume}
    \\end{document}
  `
}

export default template5
