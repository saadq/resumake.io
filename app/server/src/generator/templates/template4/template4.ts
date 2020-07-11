import { stripIndent, source } from 'common-tags'
import { FormValues, TemplateGenerator } from '../../types'

const generator: TemplateGenerator = {
  createTexDefinitions() {
    return stripIndent`
       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       % This is a modified ONE COLUMN version of
       % the following template:
       %
       % Deedy - One Page Two Column Resume
       % LaTeX Template
       % Version 1.1 (30/4/2014)
       %
       % Original author:
       % Debarghya Das (http://debarghyadas.com)
       %
       % Original repository:
       % https://github.com/deedydas/Deedy-Resume
       %
       % IMPORTANT: THIS TEMPLATE NEEDS TO BE COMPILED WITH XeLaTeX
       %
       % This template uses several fonts not included with Windows/Linux by
       % default. If you get compilation errors saying a font is missing, find the line
       % on which the font is used and either change it to a font included with your
       % operating system or comment the line out to use the default font.
       %
       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       %
       % TODO:
       % 1. Integrate biber/bibtex for article citation under publications.
       % 2. Figure out a smoother way for the document to flow onto the next page.
       % 3. Add styling information for a "Projects/Hacks" section.
       % 4. Add location/address information
       % 5. Merge OpenFont and MacFonts as a single sty with options.
       %
       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       %
       % CHANGELOG:
       % v1.1:
       % 1. Fixed several compilation bugs with \\renewcommand
       % 2. Got Open-source fonts (Windows/Linux support)
       % 3. Added Last Updated
       % 4. Move Title styling into .sty
       % 5. Commented .sty file.
       %
       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       %
       % Known Issues:
       % 1. Overflows onto second page if any column's contents are more than the
       % vertical limit
       % 2. Hacky space on the first bullet point on the second column.
       %
       %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
     `
  },

  createBasicsSection(basics) {
    const { name, email, phone, location = { address: '' }, website } = basics

    let nameStart = ''
    let nameEnd = ''

    if (name) {
      const names = name.split(' ')

      if (names.length === 1) {
        nameStart = names[0]
        nameEnd = ''
      } else {
        nameStart = names[0]
        nameEnd = names.slice(1, names.length).join(' ')
      }
    }

    const info = [email, phone, location.address, website]
      .filter(Boolean)
      .join(' | ')

    if (!name) {
      return stripIndent`
        \\centering{
          \\color{headings}
          \\fontspec[Path = fonts/raleway/]{Raleway-Medium}
          \\fontsize{11pt}{14pt}
          \\selectfont ${info}
        }
      `
    }

    return stripIndent`
      \\namesection{${nameStart}}{${nameEnd}}{${info}}
    `
  },

  createEducationSection(education, sectionName) {
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
    return this.createTableSection(skills, sectionName)
  },

  createProjectsSection(projects, sectionName) {
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
          bullets,
          topLeftText,
          topRightText,
          bottomLeftText,
          bottomRightText
        } = subsection
        let line1 = ''
        let highlightLines = ''
        if (topLeftText) {
          line1 += `\\runsubsection{${topLeftText}}`
        }
        if (bottomLeftText) {
          line1 += `\\descript{| ${bottomLeftText}}`
        }
        if (topRightText && bottomRightText) {
          line1 += `\\hfill \\location{${topRightText} | ${bottomRightText}}`
        } else if (topRightText) {
          line1 += `\\hfill \\location{${topRightText}}`
        } else if (bottomRightText) {
          line1 += `\\hfill \\location{${bottomRightText}}`
        }
        if (bullets.length) {
          highlightLines = source`
            \\begin{tightemize}
              ${bullets.map((bullet) => `\\item ${bullet}`)}
            \\end{tightemize}
            `
        }
        return stripIndent`
          ${line1}
          ${highlightLines}
          \\sectionsep
        `
      })}
    `
  },

  createTableSection(section, sectionName) {
    return source`
      \\section{${sectionName || 'Skills'}}
      \\raggedright
      \\begin{tabular}{ l l }
      ${section.map((subsection) => {
        const { name = '', keywords = [] } = subsection
        return `\\descript{${name}} & {\\location{${keywords.join(', ')}}} \\\\`
      })}
      \\end{tabular}
      \\sectionsep
    `
  },

  createParagraphSection(section, sectionName) {
    return source`
      \\section{${sectionName || 'Bullets Section'}}
      ${section.map((subsection) => {
        const {
          paragraph,
          topLeftText,
          topRightText,
          bottomLeftText,
          bottomRightText
        } = subsection
        let line1 = ''
        let line2 = ''
        if (topLeftText) {
          line1 += `\\runsubsection{${topLeftText}}`
        }
        if (bottomLeftText) {
          line1 += `\\descript{| ${bottomLeftText}}`
        }
        if (topRightText && bottomRightText) {
          line1 += `\\hfill \\location{${topRightText} | ${bottomRightText}}`
        } else if (topRightText) {
          line1 += `\\hfill \\location{${topRightText}}`
        } else if (bottomRightText) {
          line1 += `\\hfill \\location{${bottomRightText}}`
        }
        if (paragraph) {
          line2 = `\n${paragraph}`
        }
        return stripIndent`
          ${line1}
          ${line2}
          \\sectionsep
        `
      })}
    `
  }
}

export function template4(values: FormValues) {
  return stripIndent`
    ${generator.createTexDefinitions()}
    \\documentclass[]{deedy-resume-openfont}
    \\begin{document}
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
        .join('\n')}
    \\end{document}
  `
}
