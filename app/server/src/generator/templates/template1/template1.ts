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

  createBasicsSection(basics) {
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

  createEducationSection(education, sectionName) {
    const paragraphSection = education.map((school) => ({
      paragraph: school.gpa,
      topLeftText: school.institution,
      topRightText: school.location,
      bottomLeftText: `${school.studyType || ''} ${school.area || ''}`,
      bottomRightText: `\\hfill ${[school.startDate, school.endDate]
        .filter(Boolean)
        .join(' - ')}`
    }))

    return this.createParagraphSection(paragraphSection, sectionName)
  },

  createWorkSection(jobs, sectionName) {
    const bulletsSection = jobs.map((job) => ({
      bullets: job.highlights,
      topLeftText: job.company,
      topRightText: job.location,
      bottomLeftText: job.position,
      bottomRightText: `\\hfill ${[job.startDate, job.endDate]
        .filter(Boolean)
        .join(' - ')}`
    }))

    return this.createBulletsSection(bulletsSection, sectionName)
  },

  createSkillsSection(skills, sectionName) {
    return this.createTableSection(skills, sectionName)
  },

  createProjectsSection(projects, sectionName) {
    const paragraphSection = projects.map((project) => ({
      paragraph: '',
      topLeftText: project.name,
      topRightText: project.url,
      bottomLeftText: project.description,
      bottomRightText: project.keywords.join(', ')
    }))

    return this.createParagraphSection(paragraphSection, sectionName)
  },

  createAwardsSection(awards, sectionName) {
    if (!awards) {
      return ''
    }

    const paragraphSection = awards.map((award) => ({
      paragraph: '',
      topLeftText: award.title,
      topRightText: award.awarder,
      bottomLeftText: award.summary,
      bottomRightText: award.date
    }))

    return this.createParagraphSection(paragraphSection, sectionName)
  },

  createBulletsSection(section, sectionName) {
    if (!section) {
      return ''
    }

    return source`
      %==== ${sectionName || 'BULLETS SECTION'} ====%
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
    return source`
      %==== ${sectionName || 'TABLE SECTION'} ====%
      \\header{${sectionName || 'Table Section'}}
      \\begin{tabular}{ l l }
      ${section.map((subsection) => {
        const { name, keywords = [] } = subsection
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

  createParagraphSection(section, sectionName) {
    return source`
      %==== ${sectionName || 'PARAGRAPH SECTION'} ====%
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
          ${paragraph || ''}
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
      .filter((section) => values[section.name] != null)
      .map((section) => {
        switch (section.name) {
          case 'basics':
            return generator.createBasicsSection(values.basics)

          case 'education':
            return generator.createEducationSection(
              values.education,
              section.displayName || section.name
            )

          case 'work':
            return generator.createWorkSection(
              values.work,
              section.displayName || section.name
            )

          case 'skills':
            return generator.createSkillsSection(
              values.skills,
              section.displayName || section.name
            )

          case 'projects':
            return generator.createProjectsSection(
              values.projects,
              section.displayName || section.name
            )

          case 'awards':
            return generator.createAwardsSection(
              values.awards,
              section.displayName || section.name
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
