/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues, Generator } from '../../../types'

const generator: Generator = {
  profileSection(basics) {
    if (!basics) {
      return '\\header{}{}{}'
    }

    const { name, email, phone, location = {}, website } = basics

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

    if (nameStart && nameEnd) {
      nameStart += ' '
    }

    const info = [email, phone, location.address, website]
      .filter(Boolean)
      .join(' | ')

    return stripIndent`
      \\header{${nameStart}}{${nameEnd}}{${info}}
    `
  },

  educationSection(education, heading) {
    if (!education) {
      return ''
    }

    return source`
      \\section{${heading || 'Education'}}
      \\begin{entrylist}
      ${education.map(school => {
        const {
          institution,
          location,
          studyType = '',
          area = '',
          gpa,
          startDate = '',
          endDate = ''
        } = school

        let schoolLine = ''

        if (institution) {
          schoolLine += institution
        }

        if (studyType && area) {
          schoolLine += `, {\\normalfont ${studyType} in ${area}}`
        } else if (studyType || area) {
          schoolLine += `, {\\normalfont ${studyType || area}}`
        }

        let dateRange = ''

        if (startDate && endDate) {
          dateRange = `${startDate} - ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} - Present`
        } else {
          dateRange = endDate
        }

        return `
          \\entry
            {${dateRange}}
            {${schoolLine}}
            {${location || ''}}
            {${gpa ? `\\emph{GPA: ${gpa}}` : ''}}
        `
      })}
      \\end{entrylist}
    `
  },

  workSection(work, heading) {
    if (!work) {
      return ''
    }

    return source`
      \\section{${heading || 'Experience'}}
      \\begin{entrylist}
      ${work.map(job => {
        const {
          company,
          position,
          location,
          startDate,
          endDate,
          highlights
        } = job

        let jobLine = ''
        let dateRange = ''
        let highlightLines = ''

        if (company) {
          jobLine += company
        }

        if (position) {
          jobLine += `, ${position}`
        }

        if (highlights) {
          highlightLines = source`
            \\vspace{-3mm}\\begin{itemize}[leftmargin=10pt,itemsep=4pt]
            ${highlights.map(highlight => `\\item ${highlight}`)}
            \\end{itemize}
            `
        }

        if (startDate && endDate) {
          dateRange = `${startDate} – ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} – Present`
        } else {
          dateRange = endDate
        }

        return `
          \\entry
            {${dateRange || ''}}
            {${jobLine}}
            {${location || ''}}
            {${highlightLines}}
        `
      })}
      \\end{entrylist}
    `
  },

  skillsSection(skills, heading) {
    if (!skills) {
      return ''
    }

    return source`
    \\section{${heading || 'Skills'}}
    \\begin{entrylist}
    ${skills.map(({ name, keywords = [] }) => {
      const nameLine = name ? `${name}: ` : ''
      const keywordsLine = keywords
        ? `{\\normalfont ${keywords.join(', ')}}`
        : ''

      return `\\skill{}{${nameLine}${keywordsLine}}`
    })}
    \\end{entrylist}
    `
  },

  projectsSection(projects, heading) {
    if (!projects) {
      return ''
    }

    return source`
    \\section{${heading || 'Projects'}}
    \\begin{entrylist}
    ${projects.map(project => {
      const { name, description, keywords = [], url } = project

      let nameLine = ''

      if (name) {
        nameLine += name
      }

      if (keywords) {
        nameLine += ` {\\normalfont ${keywords.join(', ')}}`
      }

      return `
        \\entry
          {}
          {${nameLine}}
          {${url || ''}}
          {${description || ''}}
      `
    })}
    \\end{entrylist}
    `
  },

  awardsSection(awards, heading) {
    if (!awards) {
      return ''
    }

    return source`
    \\section{${heading || 'Awards'}}
    \\begin{entrylist}
    ${awards.map(award => {
      const { title, summary, date, awarder } = award

      return stripIndent`
        \\entry
          {${date || ''}}
          {${title || ''}}
          {${awarder || ''}}
          {${summary || ''}}
      `
    })}
    \\end{entrylist}
    `
  }
}

function template6(values: SanitizedValues) {
  const { headings = {} } = values

  return stripIndent`
    %!TEX TS-program = xelatex
    \\documentclass[]{friggeri-cv}

    \\begin{document}
    ${values.orderedSections
      .map(section => {
        switch (section) {
          case 'profile':
            return generator.profileSection(values.basics)

          case 'education':
            return generator.educationSection(values.education, headings.education)

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
