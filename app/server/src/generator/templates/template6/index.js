/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues, Generator } from '../../../types'

const generator: Generator = {
  profileSection(basics) {
    if (!basics) {
      return ''
    }

    const { name = '', email, phone, location = {}, website } = basics
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

  aboutSection(basics, heading) {
    if (!basics || !basics.summary) {
      return ''
    }

    return source`
      % Chapter: About
      % ------------------

      \\chap{${heading ? heading.toUpperCase() : 'ABOUT'}}{

        ${basics.summary}
        \\vspace{\\sizefour}
      }
    `
  },

  educationSection(education, heading) {
    if (!education) {
      return ''
    }

    return source`
      % Chapter: Education
      % ------------------

      \\chap{${heading ? heading.toUpperCase() : 'EDUCATION'}}{

      ${education.map(school => {
        const {
          institution = '',
          location = '',
          area = '',
          studyType = '',
          gpa = '',
          startDate = '',
          endDate = ''
        } = school

        const degreeLine = [studyType, area].filter(Boolean).join(' ')
        let dateRange = ''

        if (startDate && endDate) {
          dateRange = `${startDate} – ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} – Present`
        } else {
          dateRange = endDate
        }

        return stripIndent`
            \\school
              {${institution}}
              {${dateRange}}
              {${degreeLine}}
              {${location}}
              {${
                gpa
                  ? `\\begin{newitemize}
                  \\item ${gpa ? `GPA: ${gpa}` : ''}
                \\end{newitemize}`
                  : ''
              }
          }
        `
      })}
      }
    `
  },

  workSection(work, heading) {
    if (!work) {
      return ''
    }

    return source`
      % Chapter: Work Experience
      % ------------------------
      \\chap{${heading ? heading.toUpperCase() : 'EXPERIENCE'}}{

      ${work.map(job => {
        const {
          company = '',
          position = '',
          location = '',
          startDate = '',
          endDate = '',
          highlights = []
        } = job

        let dateRange = ''
        let dutyLines = ''

        if (startDate && endDate) {
          dateRange = `${startDate} – ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} – Present`
        } else {
          dateRange = endDate
        }

        if (highlights) {
          dutyLines = source`
            \\begin{newitemize}
              ${highlights.map(duty => `\\item {${duty}}`)}
            \\end{newitemize}
            `
        }

        return stripIndent`
          \\job
            {${company}}
            {${dateRange}}
            {${position}}
            {${location}}
            {${dutyLines}}
        `
      })}
    }
    `
  },

  skillsSection(skills, heading) {
    if (!skills) {
      return ''
    }

    return source`
      % Chapter: Skills
      % ------------------------

      \\chap{${heading ? heading.toUpperCase() : 'SKILLS'}}{
      \\begin{newitemize}
        ${skills.map(skill => {
          const { name = '', keywords = [] } = skill

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
  },

  projectsSection(projects, heading) {
    if (!projects) {
      return ''
    }

    return source`
      % Chapter: Projects
      % ------------------------

      \\chap{${heading ? heading.toUpperCase() : 'PROJECTS'}}{

        ${projects.map(project => {
          const {
            name = '',
            description = '',
            keywords = [],
            url = ''
          } = project

          const descriptionWithNewline = description
            ? `${description}\\\\`
            : description

          return stripIndent`
            \\project
              {${name}}
              {${keywords.join(', ')}}
              {${url}}
              {${descriptionWithNewline}}
          `
        })}
      }
    `
  },

  awardsSection(awards, heading) {
    if (!awards) {
      return ''
    }

    return source`
      % Chapter: Awards
      % ------------------------

      \\chap{${heading ? heading.toUpperCase() : 'AWARDS'}}{

        ${awards.map(award => {
          const { title = '', summary = '', awarder = '', date = '' } = award

          return stripIndent`
            \\award
              {${title}}
              {${date}}
              {${summary}}
              {${awarder}}
          `
        })}
      }
    `
  }
}

function template6(values: SanitizedValues) {
  const { headings = {} } = values

  return stripIndent`
    \\documentclass[10pt]{article}
    \\usepackage[english]{babel}
    \\input{config/minimal-resume-config}
    \\begin{document}
    ${values.sections
      .map(section => {
        switch (section) {
          case 'profile':
            return generator.profileSection(values.basics)

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
            return generator.projectsSection(values.projects, headings.projects)

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

export default template6
