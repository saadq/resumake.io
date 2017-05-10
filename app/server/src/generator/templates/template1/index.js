const { stripIndent, source } = require('common-tags')

function template1({ profile, schools, jobs, projects, skills }) {
  return stripIndent`
    %!TEX TS-program = xelatex
    \\documentclass[]{friggeri-cv}

    \\begin{document}
    ${generateProfileSection(profile)}
    ${generateEducationSection(schools)}
    ${generateExperienceSection(jobs)}
    ${generateSkillsSection(skills)}

    \\section{Projects}
    \\begin{entrylist}
    \\entry
        {}
        {LaTeX Resume Generator {\\normalfont React, Redux, Node.js, Koa}}
        {https://latexresu.me}
        {A webapp for generating LaTeX resumes from form data (including this one).}

    \\entry
        {}
        {Anagrams {\\normalfont HTML, CSS, JavaScript}}
        {https://saadq.github.io/Anagrams}
        {A cognitive, anagram-recognition game where the player must quickly find the answer.}

    \\entry
        {}
        {Flow Timer {\\normalfont React, Redux, Node.js, Koa}}
        {https://github.com/flow-timer}
        {A modern speedcubing app with a scrambler, timer, and analyzer for cubing statistics.}

    \\entry
        {}
        {Reddit Image Scraper {\\normalfont Ruby, Sinatra}}
        {https://reddit-scraper.herokuapp.com}
        {A web app that lets you view a collage of images/videos from a subreddit.}

    \\entry
        {}
        {Materialize {\\normalfont XML, JSON}}
        {https://packagecontrol.io/packages/Materialize}
        {A collection of custom themes for Sublime Text, inspired by Material design with 30k+ installations.}

    \\end{entrylist}

    \\end{document}
  `
}

function generateProfileSection(profile) {
  if (!profile) {
    return ''
  }

  const { fullName, email, phoneNumber, address, link } = profile

  let nameStart = ''
  let nameEnd = ''

  if (fullName) {
    const names = fullName.split(' ')

    if (names.length === 1) {
      nameStart = names[0]
      nameEnd = ''
    } else if (names.length === 2) {
      nameStart = names[0]
      nameEnd = names[1]
    } else {
      nameStart = names.slice(0, names.length - 1).join(' ')
      nameEnd = names[names.length - 1]
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
    ${schools.map((school) => {
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
      ${jobs.map((job) => {
        const { name, title, location, startDate, endDate, duties } = job

        let jobLine = ''
        let dateRange = ''
        let dutyLines

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
            {${dateRange}}
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

module.exports = template1
