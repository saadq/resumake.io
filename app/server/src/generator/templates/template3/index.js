const { stripIndent, source } = require('common-tags')

function template3({ profile = {}, schools = [], jobs = [], projects = [], skills = {} }) {
  return stripIndent`
    \\documentclass{article}
    \\usepackage{fullpage}
    \\usepackage{amsmath}
    \\usepackage{amssymb}
    \\textheight=10in
    \\pagestyle{empty}
    \\raggedright

    ${generateResumeDefinitions()}

    \\begin{document}

        \\vspace*{-40pt}

        ${generateProfileSection(profile)}

        \\vspace*{2mm}

        ${generateEducationSection(schools)}

        \\vspace*{2mm}

        ${generateExperienceSection(jobs)}

        ${generateSkillsSection(skills)}

        \\vspace*{2mm}

        ${generateProjectsSection(projects)}

    \\end{document}
  `
}

function generateProfileSection(profile) {
  const { fullName, email, phoneNumber, address, link } = profile

  const info = [address, email, phoneNumber, link]
    .filter(Boolean)
    .join(' $\\cdot$ ')

  return stripIndent`
    %==== Profile ====%
    \\contact{${fullName || 'Your Name'}}
    {${info || 'Contact Info'}}
  `
}

function generateEducationSection(schools) {
  if (schools.length === 0 || schools.every(school => Object.keys(school).length === 0)) {
    return ''
  }

  return source`
    %==== Education ====%
    \\header{Education}

        ${schools.filter(Boolean).map((school) => {
          if (Object.keys(school).length === 0) {
            return
          }

          const { name, location, degree, major, gpa, graduationDate } = school

          let line1 = ''
          let line2 = ''

          line1 += `\\textbf{${name || 'School Name'}}`

          if (location) {
            line1 += `\\hfill ${location}`
          }

          line1 += '\\\\'

          if (degree) {
            line2 += degree
          }

          if (major) {
            line2 += degree ? ` ${major}` : `Degree in ${major}`
          }

          if (gpa) {
            line2 += ` \\textit{GPA: ${gpa}}`
          }

          if (graduationDate) {
            const gradLine = `Grad: ${graduationDate}`
            line2 += line2 ? ` \\hfill ${gradLine}` : gradLine
          }

          if (line2) {
            line2 += '\\\\'
          }

          line2.trim()

          return stripIndent`
            ${line1}
            ${line2}
            \\vspace{1mm}
          `
        })}
  `
}

function generateExperienceSection(jobs) {
  if (jobs.length === 0 || jobs.every(job => Object.keys(job).length === 0)) {
    return ''
  }

  return source`
    %==== Experience ====%
    \\header{Experience}
    \\vspace{1mm}

    ${jobs.filter(Boolean).map((job) => {
      if (Object.keys(job).length === 0) {
        return ''
      }

      const { name, title, location, startDate, endDate, duties } = job

      let line1 = ''
      let line2 = ''
      let dutyLines = ''

      line1 += `\\textbf{${name || 'Company Name'}}`

      if (location) {
        line1 += ` \\hfill ${location}`
      }

      line1 += '\\\\'

      line2 += `\\textit{${title || 'Job Title'}}`

      if (startDate && endDate) {
        line2 += ` \\hfill ${startDate} | ${endDate}`
      } else if (startDate) {
        line2 += ` \\hfill ${startDate} | Present`
      } else if (endDate) {
        line2 += ` \\hfill ${endDate}`
      }

      line2 += '\\\\'

      if (duties && duties.filter(Boolean).length > 0) {
        dutyLines = source`
          \\vspace{-1mm}
          \\begin{itemize} \\itemsep 1pt
            ${duties.filter(Boolean).map(duty => `\\item ${duty}`)}
          \\end{itemize}
        `
      }

      return stripIndent`
        ${line1}
        ${line2}
        ${dutyLines}
      `
    })}
  `
}

function generateSkillsSection(skills) {
  if (!skills || Object.keys(skills).length === 0) {
    return ''
  }

  const { languages, frameworks, miscellaneous } = skills

  return `
    \\header{Skills}
    \\begin{tabular}{ l l }
      ${languages ? `Programming Languages: & ${languages} \\\\` : ''}
      ${frameworks ? `Frameworks/Libraries: & ${frameworks} \\\\` : ''}
      ${miscellaneous ? `Miscellaneous: & ${miscellaneous} \\\\` : ''}
    \\end{tabular}
  `
}

function generateProjectsSection(projects) {
  if (!projects || projects.length === 0) {
    return ''
  }

  return source`
    \\header{Projects}
    ${projects.filter(Boolean).map((project) => {
      if (Object.keys(project) === 0) {
        return ''
      }

      const { name, description, technologies, link } = project

      let line1 = ''
      let line2 = description || ''

      line1 += `{\\textbf{${name || 'Project Name'}}`

      if (technologies) {
        line1 += `, \\sl ${technologies}} `
      }

      if (link) {
        line1 += `\\hfill ${link}`
      }

      line1 += '\\\\'

      if (line2) {
        line2 += '\\\\'
      }

      return stripIndent`
        ${line1}
        ${line2}
        \\vspace*{2mm}
      `
    })}
  `
}

function generateResumeDefinitions() {
  return stripIndent`
    %\\renewcommand{\\encodingdefault}{cg}
    %\\renewcommand{\\rmdefault}{lgrcmr}

    \\def\\bull{\\vrule height 0.8ex width .7ex depth -.1ex }

    % DEFINITIONS FOR RESUME %%%%%%%%%%%%%%%%%%%%%%%

    \\newcommand{\\area} [2] {
        \\vspace*{-9pt}
        \\begin{verse}
            \\textbf{#1}   #2
        \\end{verse}
    }

    \\newcommand{\\lineunder} {
        \\vspace*{-8pt} \\\\
        \\hspace*{-18pt} \\hrulefill \\\\
    }

    \\newcommand{\\header} [1] {
        {\\hspace*{-18pt}\\vspace*{6pt} \\textsc{#1}}
        \\vspace*{-6pt} \\lineunder
    }

    \\newcommand{\\employer} [3] {
        { \\textbf{#1} (#2)\\\\ \\underline{\\textbf{\\emph{#3}}}\\\\  }
    }

    \\newcommand{\\contact} [3] {
        \\vspace*{-10pt}
        \\begin{center}
            {\\Huge \\scshape {#1}}\\\\
            #2 \\\\ #3
        \\end{center}
        \\vspace*{-8pt}
    }

    \\newenvironment{achievements}{
        \\begin{list}
            {$\\bullet$}{\\topsep 0pt \\itemsep -2pt}}{\\vspace*{4pt}
        \\end{list}
    }

    \\newcommand{\\schoolwithcourses} [4] {
        \\textbf{#1} #2 $\\bullet$ #3\\\\
        #4 \\\\
        \\vspace*{5pt}
    }

    \\newcommand{\\school} [4] {
        \\textbf{#1} #2 $\\bullet$ #3\\\\
        #4 \\\\
    }
        % END RESUME DEFINITIONS %%%%%%%%%%%%%%%%%%%%%%%
  `
}

module.exports = template3
