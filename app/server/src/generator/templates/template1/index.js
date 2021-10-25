/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues, Generator } from '../../../types'

type Template1Generator = Generator & {
  resumeDefinitions: () => string
}

const generator: Template1Generator = {
  profileSection(basics) {
    if (!basics) {
      return ''
    }

    const { name, email, phone, location, website } = basics
    const address = (location && location.address) || ''

    let line1 = name ? `{\\Huge \\scshape {${name}}}` : ''
    let line2 = [address, email, phone, website]
      .filter(Boolean)
      .join(' $\\cdot$ ')

    if (line1 && line2) {
      line1 += '\\\\'
      line2 += '\\\\'
    }

    return stripIndent`
      %==== Profile ====%
      \\vspace*{-10pt}
      \\begin{center}
        ${line1}
        ${line2}
      \\end{center}
    `
  },

  educationSection(education, heading) {
    if (!education) {
      return ''
    }

    return source`
      %==== Education ====%
      \\header{${heading || 'Education'}}
      ${education.map(school => {
        const {
          institution,
          location,
          studyType,
          area,
          gpa,
          startDate,
          endDate
        } = school

        let line1 = ''
        let line2 = ''

        if (institution) {
          line1 += `\\textbf{${institution}}`
        }

        if (location) {
          line1 += `\\hfill ${location}`
        }

        if (studyType) {
          line2 += studyType
        }

        if (area) {
          line2 += studyType ? ` ${area}` : `Degree in ${area}`
        }

        if (gpa) {
          line2 += ` \\textit{GPA: ${gpa}}`
        }

        if (startDate || endDate) {
          const gradLine = `${startDate || ''} - ${endDate || ''}`
          line2 += line2 ? ` \\hfill ${gradLine}` : gradLine
        }

        if (line1) {
          line1 += '\\\\'
        }

        if (line2) {
          line2 += '\\\\'
        }

        return stripIndent`
          ${line1}
          ${line2.trim()}
          \\vspace{2mm}
        `
      })}
    `
  },

  workSection(work, heading) {
    if (!work) {
      return ''
    }

    return source`
      %==== Experience ====%
      \\header{${heading || 'Experience'}}
      \\vspace{1mm}

      ${work.map(job => {
        const {
          company,
          position,
          location,
          startDate,
          endDate,
          highlights
        } = job

        let line1 = ''
        let line2 = ''
        let highlightLines = ''

        if (company) {
          line1 += `\\textbf{${company}}`
        }

        if (location) {
          line1 += ` \\hfill ${location}`
        }

        if (position) {
          line2 += `\\textit{${position}}`
        }

        if (startDate && endDate) {
          line2 += ` \\hfill ${startDate} - ${endDate}`
        } else if (startDate) {
          line2 += ` \\hfill ${startDate} - Present`
        } else if (endDate) {
          line2 += ` \\hfill ${endDate}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        if (highlights) {
          highlightLines = source`
              \\vspace{-1mm}
              \\begin{itemize} \\itemsep 1pt
                ${highlights.map(highlight => `\\item ${highlight}`)}
              \\end{itemize}
            `
        }

        return stripIndent`
          ${line1}
          ${line2}
          ${highlightLines}
        `
      })}
    `
  },

  skillsSection(skills, heading) {
    if (!skills) {
      return ''
    }

    return source`
      \\header{${heading || 'Skills'}}
      \\begin{tabular}{ l l }
      ${skills.map(skill => {
        const { name = 'Misc', keywords = [] } = skill
        return `${name}: & ${keywords.join(', ')} \\\\`
      })}
      \\end{tabular}
      \\vspace{2mm}
    `
  },

  projectsSection(projects, heading) {
    if (!projects) {
      return ''
    }

    return source`
      \\header{${heading || 'Projects'}}
      ${projects.map(project => {
        if (Object.keys(project) === 0) {
          return ''
        }

        const { name, description, keywords, url } = project

        let line1 = ''
        let line2 = description || ''

        if (name) {
          line1 += `{\\textbf{${name}}}`
        }

        if (keywords) {
          line1 += ` {\\sl ${keywords.join(', ')}} `
        }

        if (url) {
          line1 += `\\hfill ${url}`
        }

        if (line1) {
          line1 += '\\\\'
        }

        if (line2) {
          line2 += '\\\\'
        }

        return stripIndent`
          ${line1}
          ${line2}
          \\vspace*{2mm}
        `
      })}
    `
  },

  awardsSection(awards, heading) {
    if (!awards) {
      return ''
    }

    return source`
      \\header{${heading || 'Awards'}}
      ${awards.map(award => {
        const { title, summary, date, awarder } = award

        let line1 = ''
        let line2 = summary || ''

        if (title) {
          line1 += `\\textbf{${title}}`
        }

        if (awarder) {
          line1 += ` \\hfill ${awarder}`
        }

        if (date) {
          line2 += ` \\hfill ${date}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        return stripIndent`
          ${line1}
          ${line2}
          \\vspace*{2mm}
        `
      })}
    `
  },

  resumeDefinitions() {
    return stripIndent`
      %\\renewcommand{\\encodingdefault}{cg}
      %\\renewcommand{\\rmdefault}{lgrcmr}

      \\def\\bull{\\vrule height 0.8ex width .7ex depth -.1ex }

      % DEFINITIONS FOR RESUME %%%%%%%%%%%%%%%%%%%%%%%

      \\newcommand{\\area} [2] {
          \\vspace*{-9pt}
          \\begin{verse}
              \\textbf{#1}   #2
          \\end{verse}
      }

      \\newcommand{\\lineunder} {
          \\vspace*{-8pt} \\\\
          \\hspace*{-18pt} \\hrulefill \\\\
      }

      \\newcommand{\\header} [1] {
          {\\hspace*{-18pt}\\vspace*{6pt} \\textsc{#1}}
          \\vspace*{-6pt} \\lineunder
      }

      \\newcommand{\\employer} [3] {
          { \\textbf{#1} (#2)\\\\ \\underline{\\textbf{\\emph{#3}}}\\\\  }
      }

      \\newcommand{\\contact} [3] {
          \\vspace*{-10pt}
          \\begin{center}
              {\\Huge \\scshape {#1}}\\\\
              #2 \\\\ #3
          \\end{center}
          \\vspace*{-8pt}
      }

      \\newenvironment{achievements}{
          \\begin{list}
              {$\\bullet$}{\\topsep 0pt \\itemsep -2pt}}{\\vspace*{4pt}
          \\end{list}
      }

      \\newcommand{\\schoolwithcourses} [4] {
          \\textbf{#1} #2 $\\bullet$ #3\\\\
          #4 \\\\
          \\vspace*{5pt}
      }

      \\newcommand{\\school} [4] {
          \\textbf{#1} #2 $\\bullet$ #3\\\\
          #4 \\\\
      }
      % END RESUME DEFINITIONS %%%%%%%%%%%%%%%%%%%%%%%
    `
  }
}

function template1(values: SanitizedValues) {
  const { headings = {} } = values

  return stripIndent`
    \\documentclass[a4paper]{article}
    \\usepackage{fullpage}
    \\usepackage{amsmath}
    \\usepackage{amssymb}
    \\usepackage{textcomp}
    \\usepackage[utf8]{inputenc}
    \\usepackage[T1]{fontenc}
    \\textheight=10in
    \\pagestyle{empty}
    \\raggedright
    \\usepackage[left=0.8in,right=0.8in,bottom=0.8in,top=0.8in]{geometry}

    ${generator.resumeDefinitions()}

    \\begin{document}
    \\vspace*{-40pt}

    ${values.sections
      .map(section => {
        switch (section) {
          case 'profile':
            return generator.profileSection(values.basics)

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
            return generator.projectsSection(values.projects, headings.projects)

          case 'awards':
            return generator.awardsSection(values.awards, headings.awards)

          default:
            return ''
        }
      })
      .join('\n\n')}

    ${WHITESPACE}
    \\end{document}
  `
}

export default template1
