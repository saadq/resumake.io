/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { FormValues, TemplateGenerator } from '../../types'

const WHITESPACE = '\n\n'

const generator: TemplateGenerator = {
  createTexDefinitions() {
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
  },

  createProfileSection(basics) {
    if (!basics) {
      return ''
    }

    const { name, email, phone, location, website } = basics
    const address = location?.address ?? ''

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

  createEducationSection(education, heading) {
    if (!education) {
      return ''
    }

    return source`
      %==== Education ====%
      \\header{${heading || 'Education'}}
      ${education.map((school) => {
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

  createWorkSection(jobs, sectionName) {
    if (!jobs) {
      return ''
    }

    return source`
      %==== Experience ====%
      \\header{${sectionName || 'Experience'}}
      \\vspace{1mm}

      ${jobs.map((job) => {
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
                ${highlights.map((highlight) => `\\item ${highlight}`)}
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

  createSkillsSection(skills, sectionName) {
    if (!skills) {
      return ''
    }

    return source`
      \\header{${sectionName || 'Skills'}}
      \\begin{tabular}{ l l }
      ${skills.map((skill) => {
        const { name, keywords = [] } = skill
        if (name) {
          return `${name}: & ${keywords.join(', ')} \\\\`
        } else {
          return `${keywords.join(', ')} \\\\`
        }
      })}
      \\end{tabular}
      \\vspace{2mm}
    `
  },

  createProjectsSection(projects, heading) {
    if (!projects || projects.filter(Boolean).length == 0) {
      return ''
    }

    return source`
      \\header{${heading || 'Projects'}}
      ${projects.map((project) => {
        if (!project || Object.keys(project).length === 0) {
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

  createAwardsSection(awards, sectionNmae) {
    if (!awards) {
      return ''
    }

    return source`
      \\header{${sectionNmae || 'Awards'}}
      ${awards.map((award) => {
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

  createBulletsSection(section, sectionName) {
    if (!section) {
      return ''
    }

    return source`
      %==== Experience ====%
      \\header{${sectionName || 'Bullets Section'}}
      \\vspace{1mm}

      ${section.map((subsection) => {
        const {
          topLeftText,
          topRightText,
          bottomLeftText,
          bottomRightText,
          bullets
        } = subsection

        let line1 = ''
        let line2 = ''
        let bulletLines = ''

        if (topLeftText) {
          line1 += `\\textbf{${topLeftText}}`
        }

        if (topRightText) {
          line1 += ` \\hfill ${topRightText}`
        }

        if (bottomLeftText) {
          line2 += `\\textit{${bottomLeftText}}`
        }

        if (bottomRightText) {
          line2 += ` \\hfill ${bottomRightText}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        if (bullets) {
          bulletLines = source`
              \\vspace{-1mm}
              \\begin{itemize} \\itemsep 1pt
                ${bullets.map((highlight) => `\\item ${highlight}`)}
              \\end{itemize}
            `
        }

        return stripIndent`
          ${line1}
          ${line2}
          ${bulletLines}
        `
      })}
    `
  },

  createTableSection(section, sectionName) {
    if (!section) {
      return ''
    }

    return source`
      \\header{${sectionName || 'Table Section'}}
      \\begin{tabular}{ l l }
      ${section.map((subsection) => {
        const { category, keywords = [] } = subsection
        if (category) {
          return `${category}: & ${keywords.join(', ')} \\\\`
        } else {
          return `${keywords.join(', ')} \\\\`
        }
      })}
      \\end{tabular}
      \\vspace{2mm}
    `
  },

  createParagraphSection(section, sectionName) {
    if (!section) {
      return ''
    }

    return source`
      %==== Experience ====%
      \\header{${sectionName || 'Paragraph Section'}}
      \\vspace{1mm}

      ${section.map((subsection) => {
        const {
          topLeftText,
          topRightText,
          bottomLeftText,
          bottomRightText,
          paragraph
        } = subsection

        let line1 = ''
        let line2 = ''

        if (topLeftText) {
          line1 += `\\textbf{${topLeftText}}`
        }

        if (topRightText) {
          line1 += ` \\hfill ${topRightText}`
        }

        if (bottomLeftText) {
          line2 += `\\textit{${bottomLeftText}}`
        }

        if (bottomRightText) {
          line2 += ` \\hfill ${bottomRightText}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        return stripIndent`
          ${line1}
          ${line2}
          \\vspace*{4pt}
          ${paragraph}
        `
      })}
    `
  }
}

export function template1(values: FormValues) {
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

    ${generator.createTexDefinitions()}

    \\begin{document}
    \\vspace*{-40pt}

    ${values.sections
      .map((section) => {
        switch (section.name) {
          case 'profile':
            return generator.createProfileSection(values.basics)

          case 'education':
            return generator.createEducationSection(
              values.education,
              section.displayName
            )

          case 'work':
            return generator.createWorkSection(values.work, section.displayName)

          case 'skills':
            return generator.createSkillsSection(
              values.skills,
              section.displayName
            )

          case 'projects':
            return generator.createProjectsSection(
              values.projects,
              section.displayName
            )

          case 'awards':
            return generator.createAwardsSection(
              values.awards,
              section.displayName
            )

          default:
            if (section.type === 'bullets') {
              return generator.createBulletsSection(
                values[section.name],
                section.displayName || section.name
              )
            }

            if (section.type === 'table') {
              return generator.createTableSection(
                values[section.name],
                section.displayName || section.name
              )
            }

            if (section.type === 'paragraph') {
              return generator.createParagraphSection(
                values[section.name],
                section.displayName || section.name
              )
            }
        }
      })
      .join('\n\n')}

    ${WHITESPACE}
    \\end{document}
  `
}
