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

    const {
      name = '',
      email,
      phone,
      location = { address: '' },
      website
    } = basics
    const info = [email, phone, location.address, website].filter(Boolean)

    return stripIndent`
      \\begin{center}
      % Personal
      % -----------------------------------------------------
      {\\fontsize{\\sizeone}{\\sizeone}\\fontspec[Path = fonts/,LetterSpace=15]{Montserrat-Regular} ${name.toUpperCase()}}
      ${name && info.length > 1 ? '\\\\' : ''}
      \\vspace{2mm}
      {\\fontsize{1em}{1em}\\fontspec[Path = fonts/]{Montserrat-Light} ${info.join(
        ' -- '
      )}}
      \\end{center}
    `
  },

  createEducationSection(schools, sectionName) {
    if (!schools) {
      return ''
    }

    const paragraphSection = schools.map((school) => ({
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
      \\chap{${sectionName ? sectionName.toUpperCase() : 'Bullets Section'}}{

        ${section.map((subsection) => {
          const {
            bullets = [],
            topLeftText,
            topRightText,
            bottomLeftText,
            bottomRightText
          } = subsection

          return stripIndent`
            \\school
              {${topLeftText}}
              {${bottomRightText}}
              {${bottomLeftText}}
              {${topRightText}}
              {${
                bullets.length > 0
                  ? source`
                \\begin{newitemize}
                  ${bullets.map((bullet) => `\\item {${bullet}}`)}
                \\end{newitemize}
            `
                  : ''
              }
          }
        `
        })}
      }
    `
  },

  createParagraphSection(section, sectionName) {
    return source`
      \\chap{${sectionName ? sectionName.toUpperCase() : 'Paragraph Section'}}{

        ${section.map((subsection) => {
          const {
            paragraph,
            topLeftText,
            topRightText,
            bottomLeftText,
            bottomRightText
          } = subsection

          return stripIndent`
            \\school
              {${topLeftText}}
              {${bottomRightText}}
              {${bottomLeftText}}
              {${topRightText}}
              {${
                paragraph
                  ? `\\begin{newitemize}
                  \\item ${paragraph}
                \\end{newitemize}`
                  : ''
              }
          }
        `
        })}
      }
    `
  },

  createTableSection(section, sectionName) {
    return source`
      \\chap{${sectionName ? sectionName.toUpperCase() : 'Table Section'}}{

      \\begin{newitemize}
        ${section.map((subsection) => {
          const { name = '', keywords = [] } = subsection
          let item = ''
          if (name) {
            item += `${name}: `
          }
          if (keywords.length > 0) {
            item += keywords.join(', ')
          }
          return `\\item ${item}`
        })}
      \\end{newitemize}
      }
    `
  }
}

export function template6(values: FormValues) {
  return stripIndent`
    \\documentclass[10pt]{article}
    \\usepackage[english]{babel}
    \\input{config/minimal-resume-config}
    \\begin{document}
    ${values.sections
      .map((section) => {
        switch (section.name) {
          case 'basics':
            return generator.createBasicsSection(values.basics)

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
      .join('\n')}
    \\end{document}
  `
}
