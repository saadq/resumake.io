import { stripIndent, source } from 'common-tags'
import { FormValues, TemplateGenerator } from '../../types'

const generator: TemplateGenerator = {
  createTexDefinitions() {
    return ''
  },

  createBasicsSection(basics) {
    if (!basics) {
      return ''
    }

    const { name, email, phone, location = { address: '' }, website } = basics
    const info = [email, phone, location.address, website]
      .filter(Boolean)
      .join(' | ')

    return stripIndent`
      \\name{{\\LARGE ${name || ''}}}
      \\address{${info}}
    `
  },

  createEducationSection(education, sectionName) {
    if (!education) {
      return ''
    }

    const paragraphSection = education.map((school) => ({
      paragraph: school.gpa,
      topLeftText: school.institution,
      topRightText: school.location,
      bottomLeftText: [school.studyType, school.area].filter(Boolean).join(' '),
      bottomRightText: [school.startDate, school.endDate]
        .filter(Boolean)
        .join(' - ')
    }))
    return this.createParagraphSection(paragraphSection, sectionName)
  },

  createWorkSection(jobs, sectionName) {
    if (!jobs) {
      return ''
    }

    const bulletsSection = jobs.map((job) => ({
      bullets: job.highlights,
      topLeftText: job.company,
      topRightText: job.location,
      bottomLeftText: job.position,
      bottomRightText: [job.startDate, job.endDate].filter(Boolean).join(' - ')
    }))
    return this.createBulletsSection(bulletsSection, sectionName)
  },

  createSkillsSection(skills, sectionName) {
    if (!skills) {
      return ''
    }

    return this.createTableSection(skills, sectionName)
  },

  createProjectsSection(projects, sectionName) {
    if (!projects) {
      return ''
    }

    const bulletsSection = projects.map((project) => ({
      bullets: [],
      topLeftText: project.name,
      topRightText: project.keywords.join(', '),
      bottomLeftText: project.description,
      bottomRightText: project.url
    }))
    return this.createBulletsSection(bulletsSection, sectionName)
  },

  createAwardsSection(awards, sectionName) {
    if (!awards) {
      return ''
    }

    const bulletsSection = awards.map((award) => ({
      bullets: [],
      topLeftText: award.title,
      topRightText: award.awarder,
      bottomLeftText: award.summary,
      bottomRightText: award.date
    }))
    return this.createBulletsSection(bulletsSection, sectionName)
  },

  createBulletsSection(section, sectionName) {
    return source`
      \\section{${sectionName || 'Bullets Section'}}

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
          line2 += `{\\sl ${bottomLeftText}}`
        }

        if (bottomRightText) {
          line2 += ` \\hfill ${bottomRightText}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        if (bullets && bullets.length > 0) {
          bulletLines = source`
            \\begin{itemize} \\itemsep 3pt
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
      \\section{${sectionName || 'Table Section'}}
      \\begin{tabular}{@{}ll}
      ${section.map((subsection) => {
        const { name = '', keywords = [] } = subsection
        return `\\textbf{${name || ''}}: & ${keywords.join(', ') || ''}\\\\`
      })}
      \\end{tabular}
    `
  },

  createParagraphSection(section, sectionName) {
    return source`
      \\section{${sectionName || 'Paragraph Section'}}

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
          line1 += `\\textbf{${topLeftText}},`
        }

        if (topRightText) {
          line1 += ` \\hfill ${topRightText}`
        }

        if (bottomLeftText) {
          line2 += `{\\sl ${bottomLeftText}}`
        }

        if (bottomRightText) {
          line2 += ` \\hfill ${bottomRightText}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        return stripIndent`
          ${line1}
          ${line2}
          ${paragraph || ''}
        `
      })}
    `
  }
}

export function template5(values: FormValues) {
  return stripIndent`
      \\documentclass[line,margin]{res}
      \\usepackage[none]{hyphenat}
      \\usepackage{textcomp}
      \\usepackage[utf8]{inputenc}
      \\usepackage[T1]{fontenc}
      \\begin{document}
      ${generator.createBasicsSection(values.basics)}
      \\begin{resume}
      \\vspace{-5mm}
      ${values.sections
        .map((section) => {
          switch (section.name) {
            case 'education':
              return generator.createEducationSection(
                values.education,
                section.displayName
              )
            case 'work':
              return generator.createWorkSection(
                values.work,
                section.displayName
              )
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
        .join('\n')}
        \\end{resume}
      \\end{document}
    `
}
