const { stripIndent, source } = require('common-tags')
const { WHITESPACE } = require('../constants')

function template6({ profile, schools, jobs, projects, skills, awards }) {
  return stripIndent`
    %!TEX TS-program = xelatex
    \\documentclass[]{friggeri-cv}

    \\begin{document}
    ${generateProfileSection(profile)}
    ${generateEducationSection(schools)}
    ${generateExperienceSection(jobs)}
    ${generateSkillsSection(skills)}
    ${generateProjectsSection(projects)}
    ${generateAwardsSection(awards)}
    ${WHITESPACE}
    \\end{document}
  `
}

function generateProfileSection(profile) {
  if (!profile) {
    return '\\header{}{}{}'
  }

  const { fullName, email, phoneNumber, address, link } = profile

  let nameStart = ''
  let nameEnd = ''

  if (fullName) {
    const names = fullName.split(' ')

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

  const info = [email, phoneNumber, address, link].filter(Boolean).join(' | ')

  return stripIndent`
    \\header{${nameStart}}{${nameEnd}}{${info}}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    \\section{education}
    \\begin{entrylist}
    ${schools.map(school => {
      const { name, location, degree, major, gpa, graduationDate } = school

      let schoolLine = ''

      if (name) {
        schoolLine += name
      }

      if (degree && major) {
        schoolLine += `, {\\normalfont ${degree} in ${major}}`
      } else if (degree || major) {
        schoolLine += `, {\\normalfont ${degree || major}}`
      }

      return `
        \\entry
          {${graduationDate || ''}}
          {${schoolLine}}
          {${location || ''}}
          {${gpa ? `\\emph{GPA: ${gpa}}` : ''}}
      `
    })}
    \\end{entrylist}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    \\section{experience}
    \\begin{entrylist}
      ${jobs.map(job => {
        const { name, title, location, startDate, endDate, duties } = job

        let jobLine = ''
        let dateRange = ''
        let dutyLines = ''

        if (name) {
          jobLine += name
        }

        if (title) {
          jobLine += `, ${title}`
        }

        if (duties) {
          dutyLines = source`
            \\vspace{-3mm}\\begin{itemize}[leftmargin=10pt,itemsep=4pt]
            ${duties.map(duty => `\\item ${duty}`)}
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
            {${dutyLines}}
        `
      })}
    \\end{entrylist}
  `
}

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
    \\section{Skills}
    \\begin{entrylist}
    ${skills.map(({ name, details }) => {
      const nameLine = name ? `${name}: ` : ''
      const detailsLine = details ? `{\\normalfont ${details}}` : ''

      return `\\skill{}{${nameLine}${detailsLine}}`
    })}
    \\end{entrylist}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
    \\section{Projects}
    \\begin{entrylist}
    ${projects.map(project => {
      const { name, description, technologies, link } = project

      let nameLine = ''

      if (name) {
        nameLine += name
      }

      if (technologies) {
        nameLine += ` {\\normalfont ${technologies}}`
      }

      return `
        \\entry
          {}
          {${nameLine}}
          {${link || ''}}
          {${description || ''}}
      `
    })}
    \\end{entrylist}
  `
}

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  return source`
    \\section{awards}
    \\begin{entrylist}
      ${awards.map(award => {
        const { name, details, date, location } = award

        return stripIndent`
          \\entry
            {${date || ''}}
            {${name || ''}}
            {${location || ''}}
            {${details || ''}}
        `
      })}
    \\end{entrylist}
  `
}

module.exports = template6
