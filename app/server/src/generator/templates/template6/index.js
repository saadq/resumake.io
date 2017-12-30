/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues } from '../../../types'

function template6({
  basics,
  education,
  work,
  projects,
  skills,
  awards
}: SanitizedValues) {
  return stripIndent`
    %!TEX TS-program = xelatex
    \\documentclass[]{friggeri-cv}

    \\begin{document}
    ${generateProfileSection(basics)}
    ${generateEducationSection(education)}
    ${generateExperienceSection(work)}
    ${generateSkillsSection(skills)}
    ${generateProjectsSection(projects)}
    ${generateAwardsSection(awards)}
    ${WHITESPACE}
    \\end{document}
  `
}

function generateProfileSection(basics) {
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
}

function generateEducationSection(education) {
  if (!education || !education.schools) {
    return ''
  }

  return source`
  \\section{${education.heading || 'Education'}}
  \\begin{entrylist}
  ${education.schools.map(school => {
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
}

function generateExperienceSection(work) {
  if (!work || !work.jobs) {
    return ''
  }

  return source`
  \\section{${work.heading || 'Experience'}}
  \\begin{entrylist}
  ${work.jobs.map(job => {
    const { company, position, location, startDate, endDate, highlights } = job

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
}

function generateSkillsSection(skills) {
  if (!skills || !skills.skills) {
    return ''
  }

  return source`
  \\section{${skills.heading || 'Skills'}}
  \\begin{entrylist}
  ${skills.skills.map(({ name, keywords = [] }) => {
    const nameLine = name ? `${name}: ` : ''
    const keywordsLine = keywords ? `{\\normalfont ${keywords.join(', ')}}` : ''

    return `\\skill{}{${nameLine}${keywordsLine}}`
  })}
  \\end{entrylist}
  `
}

function generateProjectsSection(projects) {
  if (!projects || !projects.projects) {
    return ''
  }

  return source`
  \\section{${projects.heading || 'Projects'}}
  \\begin{entrylist}
  ${projects.projects.map(project => {
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
}

function generateAwardsSection(awards) {
  if (!awards || !awards.awards) {
    return ''
  }

  return source`
  \\section{${awards.heading || 'Awards'}}
  \\begin{entrylist}
  ${awards.awards.map(award => {
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

module.exports = template6
