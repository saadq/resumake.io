const { stripIndent, source } = require('common-tags')

function template5({ profile, schools, jobs, projects, skills }) {
  return stripIndent`
    \\documentclass[line,margin]{res}
    \\usepackage[none]{hyphenat}

    \\begin{document}
        ${generateProfileSection(profile)}
        \\begin{resume}

          \\vspace{-5mm}

          ${generateEducationSection(schools)}
          ${generateExperienceSection(jobs)}

          \\section{SKILLS}
              {Programming Languages:} $\\:$\\sl{Java, JavaScript/Node.js, Ruby, XML, HTML, SASS, CSS} \\vspace{1mm}
              {\\\\ \\normalfont Frameworks/Libraries:} $\\:$ $\\:$$\\:$ $\\:$\\sl{Express, React, jQuery, Sinatra, Bootstrap, Materialize} \\vspace{1mm}

          \\section{PROJECTS}
              \\textbf{LaTeX Resume Generator} \\sl Node.js, Koa, React, Redux \\\\
              A webapp for generating LaTeX resumes from form data (including this one).

              \\textbf{Cube Graphs} \\sl Node.js, Express, React, Chart.js, MongoDB \\\\
              A Rubik's Cube timer for speedcubers that visualizes a user's cubing stats with graphs.

              \\textbf{Reddit Scraper} \\sl Ruby, Sinatra \\\\
              A Sinatra web app that lets the user easily view images/videos from a subreddit.

              \\textbf{Materialize} \\sl XML, JSON \\\\
              A collection of custom themes and color schemes for ST3, inspired by Material design.

              \\textbf{Anagrams} \\sl HTML, CSS, JavaScript \\\\
              A cognitive, anagram-recognition game where the player must quickly find the answer.


        \\end{resume}

    \\end{document}
  `
}

function generateProfileSection(profile) {
  if (!profile) {
    return ''
  }

  const { fullName, email, phoneNumber, address, link } = profile
  const info = [email, phoneNumber, address, link].filter(Boolean).join(' | ')

  return stripIndent`
    \\name{{\\LARGE ${fullName || ''}}}
    \\address{${info}}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    \\section{EDUCATION}
    ${schools.map((school, i) => {
      const { name, location, degree, major, gpa, graduationDate } = school

      let schoolLine = ''
      let degreeLine = ''

      if (name) {
        schoolLine += `\\textbf{${name}}, `
      }

      if (degree && major) {
        degreeLine = `${degree} in ${major}`
      } else if (degree || major) {
        degreeLine = degree || major
      }

      if (degreeLine) {
        schoolLine += `{\\sl ${degreeLine}} `
      }

      if (gpa) {
        schoolLine += `GPA: ${gpa}`
      }

      if (graduationDate) {
        schoolLine += `\\hfill ${graduationDate}`
      }

      if (schoolLine) {
        schoolLine += '\\\\'
      }

      if (location) {
        schoolLine += `${location}`
      }

      if (i !== schools.length - 1) {
        schoolLine += '\\\\\\\\'
      }

      return schoolLine
    })}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    \\section{EXPERIENCE}
    ${jobs.map((job) => {
      const { name, title, location, startDate, endDate, duties } = job

      let jobLine = ''
      let dateRange = ''

      if (name) {
        jobLine += `\\textbf{${name}}, `
      }

      if (title) {
        jobLine += `{\\sl ${title}}`
      }

      if (startDate && endDate) {
        dateRange = `${startDate} | ${endDate}`
      } else if (startDate) {
        dateRange = `${startDate} | Present`
      } else {
        dateRange = endDate
      }

      if (dateRange) {
        jobLine += `\\hfill ${dateRange}`
      }

      if (jobLine) {
        jobLine += '\\\\'
      }

      if (location) {
        jobLine += `${location}\\\\`
      }

      if (duties) {
        jobLine += source`
          \\begin{itemize} \\itemsep 3pt
          ${duties.map(duty => `\\item ${duty}`)}
          \\end{itemize}
        `
      }

      return jobLine
    })}
  `
}

module.exports = template5
