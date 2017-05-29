const { stripIndent, source } = require('common-tags')
const { WHITESPACE } = require('../constants')

function template1({ profile, schools, jobs, projects, skills, awards }) {
  return stripIndent`
    \\documentclass[a4paper]{article}
    \\usepackage{fullpage}
    \\usepackage{amsmath}
    \\usepackage{amssymb}
    \\usepackage{textcomp}
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

        \\vspace*{2mm}

        ${generateAwardsSection(awards)}

        ${WHITESPACE}
    \\end{document}
  `
}

function generateProfileSection(profile) {
  if (!profile) {
    return ''
  }

  const { fullName, email, phoneNumber, address, link } = profile

  let line1 = fullName ? `{\\Huge \\scshape {${fullName}}}` : ''
  let line2 = [address, email, phoneNumber, link]
    .filter(Boolean)
    .join(' $\\cdot$ ')

  if (line1 && line2) {
    line1 += '\\\\'
    line2 += '\\\\'
  }

  return stripIndent`
    %==== Profile ====%
    \\vspace*{-10pt}
    \\begin{center}
      ${line1}
      ${line2}
    \\end{center}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    %==== Education ====%
    \\header{Education}
      ${schools.map(school => {
        const { name, location, degree, major, gpa, graduationDate } = school

        let line1 = ''
        let line2 = ''

        if (name) {
          line1 += `\\textbf{${name}}`
        }

        if (location) {
          line1 += `\\hfill ${location}`
        }

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

        if (line1) {
          line1 += '\\\\'
        }

        if (line2) {
          line2 += '\\\\'
        }

        line2.trim()

        return stripIndent`
          ${line1}
          ${line2}
          \\vspace{2mm}
        `
      })}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    %==== Experience ====%
    \\header{Experience}
    \\vspace{1mm}

    ${jobs.map(job => {
      const { name, title, location, startDate, endDate, duties } = job

      let line1 = ''
      let line2 = ''
      let dutyLines = ''

      if (name) {
        line1 += `\\textbf{${name}}`
      }

      if (location) {
        line1 += ` \\hfill ${location}`
      }

      if (title) {
        line2 += `\\textit{${title}}`
      }

      if (startDate && endDate) {
        line2 += ` \\hfill ${startDate} | ${endDate}`
      } else if (startDate) {
        line2 += ` \\hfill ${startDate} | Present`
      } else if (endDate) {
        line2 += ` \\hfill ${endDate}`
      }

      if (line1) line1 += '\\\\'
      if (line2) line2 += '\\\\'

      if (duties) {
        dutyLines = source`
          \\vspace{-1mm}
          \\begin{itemize} \\itemsep 1pt
            ${duties.map(duty => `\\item ${duty}`)}
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
  if (!skills) {
    return ''
  }

  return source`
    \\header{Skills}
    \\begin{tabular}{ l l }
      ${skills.map(skill => `${skill.name}: & ${skill.details} \\\\`)}
    \\end{tabular}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
    \\header{Projects}
    ${projects.map(project => {
      if (Object.keys(project) === 0) {
        return ''
      }

      const { name, description, technologies, link } = project

      let line1 = ''
      let line2 = description || ''

      if (name) {
        line1 += `{\\textbf{${name}}`
      }

      if (technologies) {
        line1 += ` \\sl ${technologies}} `
      }

      if (link) {
        line1 += `\\hfill ${link}`
      }

      if (line1) {
        line1 += '\\\\'
      }

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

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  return source`
    \\header{Awards}
    ${awards.map(award => {
      const { name, details, date, location } = award

      let line1 = ''
      let line2 = details || ''

      if (name) {
        line1 += `\\textbf{${name}}`
      }

      if (location) {
        line1 += ` \\hfill ${location}`
      }

      if (details) {
        line2 += details
      }

      if (date) {
        line2 += ` \\hfill ${date}`
      }

      if (line1) line1 += '\\\\'
      if (line2) line2 += '\\\\'

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

module.exports = template1
