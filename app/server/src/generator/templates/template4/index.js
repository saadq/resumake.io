const { stripIndent, source } = require('common-tags')
const { WHITESPACE } = require('../constants')

function template4({ profile, schools, jobs, projects, skills, awards }) {
  return stripIndent`
    ${generateCommentHeader()}
    \\documentclass[]{deedy-resume-openfont}

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
    return '\\namesection{Your}{Name}{}'
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

  const info = [email, phoneNumber, address, link].filter(Boolean).join(' | ')

  const sectionHeader = stripIndent`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Profile
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  `

  if (!fullName) {
    return stripIndent`
      ${sectionHeader}
      \\centering{
        \\color{headings}
        \\fontspec[Path = fonts/raleway/]{Raleway-Medium}
        \\fontsize{11pt}{14pt}
        \\selectfont ${info}
      }
    `
  }

  return stripIndent`
    ${sectionHeader}
    \\namesection{${nameStart}}{${nameEnd}}{${info}}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Education
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Education}
    \\raggedright
    ${schools.map(school => {
      const { name, location, degree, major, gpa, graduationDate } = school

      let line1 = ''
      let line2 = ''

      if (name) {
        line1 += `\\runsubsection{${name}}`
      }

      if (degree && major) {
        line1 += `\\descript{| ${degree} ${major}}`
      } else if (degree) {
        line1 += `\\descript{| ${degree}}`
      } else if (major) {
        line1 += `\\descript{| ${major}}`
      }

      const locationAndDate = [location, graduationDate]
        .filter(Boolean)
        .join(' | ')

      if (locationAndDate) {
        line1 += `\\hfill \\location{${locationAndDate}}`
      }

      if (line1) {
        line1 += '\\\\'
      }

      if (gpa) {
        line2 += `GPA: ${gpa}\\\\`
      }

      return `
        ${line1}
        ${line2}
        \\sectionsep
      `
    })}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Experience
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Experience}
    ${jobs.map(job => {
      const { name, title, location, startDate, endDate, duties } = job

      let line1 = ''
      let dateRange = ''
      let dutyLines = ''

      if (name) {
        line1 += `\\runsubsection{${name}}`
      }

      if (title) {
        line1 += `\\descript{| ${title}}`
      }

      if (startDate && endDate) {
        dateRange = `${startDate} – ${endDate}`
      } else if (startDate) {
        dateRange = `${startDate} – Present`
      } else {
        dateRange = endDate
      }

      if (location && dateRange) {
        line1 += `\\hfill \\location{${location} | ${dateRange}}`
      } else if (location) {
        line1 += `\\hfill \\location{${location}}`
      } else if (dateRange) {
        line1 += `\\hfill \\location{${dateRange}}`
      }

      if (duties) {
        dutyLines = source`
          \\begin{tightemize}
            ${duties.map(duty => `\\item ${duty}`)}
          \\end{tightemize}
        `
      }

      return stripIndent`
        ${line1}
        ${dutyLines}
        \\sectionsep
      `
    })}
  `
}

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Skills
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Skills}
    \\raggedright
    \\begin{tabular}{ l l }
      ${skills.map(skill => `\\descript{${skill.name}} & {\\location{${skill.details}}} \\\\`)}
    \\end{tabular}
    \\sectionsep
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Projects
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Projects}
    \\raggedright
    ${projects.map(project => {
      const { name, description, technologies, link } = project

      let line1 = ''
      let line2 = ''
      let line3 = ''

      if (name) {
        line1 += `\\runsubsection{\\large{${name}}}`
      }

      if (technologies) {
        line2 += `\\descript{| ${technologies}}`
      }

      if (link) {
        line2 += `\\hfill \\location{${link}}`
      }

      if (line2) {
        line2 += '\\\\'
      }

      if (description) {
        line3 += `${description}\\\\`
      }

      return `
        ${line1}
        ${line2}
        ${line3}
        \\sectionsep
      `
    })}
  `
}

function generateCommentHeader() {
  return stripIndent`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % This is a modified ONE COLUMN version of
    % the following template:
    %
    % Deedy - One Page Two Column Resume
    % LaTeX Template
    % Version 1.1 (30/4/2014)
    %
    % Original author:
    % Debarghya Das (http://debarghyadas.com)
    %
    % Original repository:
    % https://github.com/deedydas/Deedy-Resume
    %
    % IMPORTANT: THIS TEMPLATE NEEDS TO BE COMPILED WITH XeLaTeX
    %
    % This template uses several fonts not included with Windows/Linux by
    % default. If you get compilation errors saying a font is missing, find the line
    % on which the font is used and either change it to a font included with your
    % operating system or comment the line out to use the default font.
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    % TODO:
    % 1. Integrate biber/bibtex for article citation under publications.
    % 2. Figure out a smoother way for the document to flow onto the next page.
    % 3. Add styling information for a "Projects/Hacks" section.
    % 4. Add location/address information
    % 5. Merge OpenFont and MacFonts as a single sty with options.
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    % CHANGELOG:
    % v1.1:
    % 1. Fixed several compilation bugs with \\renewcommand
    % 2. Got Open-source fonts (Windows/Linux support)
    % 3. Added Last Updated
    % 4. Move Title styling into .sty
    % 5. Commented .sty file.
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    % Known Issues:
    % 1. Overflows onto second page if any column's contents are more than the
    % vertical limit
    % 2. Hacky space on the first bullet point on the second column.
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  `
}

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Awards
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Awards}
    ${awards.map(award => {
      const { name, details, date, location } = award
      const info = [date, location].filter(Boolean).join(' | ')

      return stripIndent`
        \\runsubsection{\\large{${name || ''}}} \\descript{${info}} \\\\
        ${details ? `${details}\\\\` : ''}
        \\sectionsep
      `
    })}
  `
}

module.exports = template4
