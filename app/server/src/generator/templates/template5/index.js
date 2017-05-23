const { stripIndent, source } = require('common-tags')

function template5({ profile, schools, jobs, projects, skills }) {
  return stripIndent`
    \\documentclass[line,margin]{res}
    \\usepackage[none]{hyphenat}
    \\usepackage{textcomp}
    \\begin{document}
        ${generateProfileSection(profile)}
        \\begin{resume}
          \\vspace{-5mm}
          ${generateEducationSection(schools)}
          ${generateExperienceSection(jobs)}
          ${generateSkillsSection(skills)}
          ${generateProjectsSection(projects)}
          \\ 
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
    ${jobs.map(job => {
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

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
    \\section{SKILLS}
    \\begin{tabular}{@{}ll}
    ${skills.map(skill => `\\textbf{${skill.name || ''}}: & ${skill.details || ''}\\\\`)}
    \\end{tabular}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
    \\section{PROJECTS}
      ${projects.map(project => {
        const { name, description, technologies, link } = project

        let projectLine = ''

        if (name) {
          projectLine += `\\textbf{${name}}`
        }

        if (technologies) {
          projectLine += `, {\\sl ${technologies}}`
        }

        if (description) {
          projectLine += projectLine ? `\\\\ ${description}` : description
        }

        if (link) {
          projectLine += projectLine ? `\\\\ ${link}` : link
        }

        if (projectLine) {
          projectLine += '\\\\\\\\'
        }

        return projectLine
      })}
  `
}

module.exports = template5
