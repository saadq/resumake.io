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

          \\section{EXPERIENCE}
              {\\textbf{Mozilla}, {\\sl Software Engineer Intern} \\hfill Jun 2016 | Aug 2016} \\\\
              Mountain View, CA
              \\vspace{1.75mm}
              \\begin{itemize} \\itemsep 3pt
                  \\item Broadened search criteria for Firefox’s context menu to include subdomains in password suggestions.
                  \\item Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.
                  \\item Fixed regressions for Firefox Electrolysis and improved dialogs and notification popups.
              \\end{itemize}

              {\\textbf{Codecademy}, {\\sl Coding Advisor}  \\hfill Dec 2015 | May 2016} \\\\
              Manhattan, NY
              \\hfill
              \\vspace{1.75mm}
              \\begin{itemize} \\itemsep 3pt
                  \\item Created a JavaScript project for Codecademy Pro members now available in the new JS course.
                  \\item Taught new coders how to avoid bugs and how to go through the process of fixing existing ones.
                  \\item Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.
              \\end{itemize}

              {\\textbf{IEEE}, {\\sl Coding Advisor} \\hfill Jun 2015 | Nov 2015} \\\\
               \\hfill Piscataway, NJ
              \\vspace{1.75mm}
              \\begin{itemize} \\itemsep 3pt
                  \\item Wrote an API that allowed CRUD operations to be used for accessing and manipulating data involving current departments/groups/teams at IEEE.
                  \\item Created a UI for admins that used the aforementioned API to automate the process of syncing departments/groups/teams on the site to relevant databases.
                  \\item Improved the IEEE Innovate site by using cookies to display tailored web-content.
              \\end{itemize}

          \\section{SKILLS}
              {Programming Languages:} $\\:$\\sl{Java, JavaScript/Node.js, Ruby, XML, HTML, SASS, CSS} \\vspace{1mm}
              {\\\\ \\normalfont Frameworks/Libraries:} $\\:$ $\\:$$\\:$ $\\:$\\sl{Express, React, jQuery, Sinatra, Bootstrap, Materialize} \\vspace{1mm}

          \\section{PROJECTS}
              \\textbf{LaTeX Resume Generator} \\sl Node.js, Koa, React, Redux \\\\
              A webapp for generating LaTeX resumes from form data (including this one).

              \\textbf{Cube Graphs} \\sl Node.js, Express, React, Chart.js, MongoDB \\\\
              A Rubik's Cube timer for speedcubers that visualizes a user's cubing stats with graphs. \\vspace{-6mm}

              \\textbf{Reddit Scraper} \\sl Ruby, Sinatra \\\\
              A Sinatra web app that lets the user easily view images/videos from a subreddit. \\vspace{-2mm}

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
        schoolLine += `\\textbf{${name ? `${name}, ` : ''}}`
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

module.exports = template5
