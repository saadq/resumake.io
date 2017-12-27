/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues } from '../../../types'

function template4({
  basics,
  education,
  work,
  projects,
  skills,
  awards
}: SanitizedValues) {
  return stripIndent`
    ${generateCommentHeader()}
    \\documentclass[]{deedy-resume-openfont}

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

function generateProfileSection(profile) {
  if (!profile) {
    return '\\namesection{Your}{Name}{}'
  }

  const { name, email, phone, location = {}, website } = profile

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

  const info = [email, phone, location.address, website]
    .filter(Boolean)
    .join(' | ')

  const sectionHeader = stripIndent`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Profile
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  `

  if (!name) {
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

function generateEducationSection(education) {
  if (!education) {
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
  ${education.map(school => {
    const {
      institution,
      location,
      studyType,
      area,
      gpa,
      startDate,
      endDate
    } = school

    let line1 = ''
    let line2 = ''

    if (institution) {
      line1 += `\\runsubsection{${institution}}`
    }

    if (studyType && area) {
      line1 += `\\descript{| ${studyType} ${area}}`
    } else if (studyType) {
      line1 += `\\descript{| ${studyType}}`
    } else if (area) {
      line1 += `\\descript{| ${area}}`
    }

    let dateRange = ''

    if (startDate && endDate) {
      dateRange = `${startDate} - ${endDate}`
    } else if (startDate) {
      dateRange = `${startDate} - Present`
    } else {
      dateRange = endDate
    }

    const locationAndDate = [location, dateRange].filter(Boolean).join(' | ')

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

function generateExperienceSection(work) {
  if (!work) {
    return ''
  }

  return source`
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %
  %     Experience
  %
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\section{Experience}
  ${work.map(job => {
    const { company, position, location, startDate, endDate, highlights } = job

    let line1 = ''
    let dateRange = ''
    let highlightLines = ''

    if (company) {
      line1 += `\\runsubsection{${company}}`
    }

    if (position) {
      line1 += `\\descript{| ${position}}`
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

    if (highlights) {
      highlightLines = source`
        \\begin{tightemize}
          ${highlights.map(highlight => `\\item ${highlight}`)}
        \\end{tightemize}
        `
    }

    return stripIndent`
      ${line1}
      ${highlightLines}
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
  ${skills.map(skill => {
    const { name = '', keywords = [] } = skill
    return `\\descript{${name}} & {\\location{${keywords.join(', ')}}} \\\\`
  })}
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
    const { name, description, keywords, url } = project

    let line1 = ''
    let line2 = ''
    let line3 = ''

    if (name) {
      line1 += `\\runsubsection{\\large{${name}}}`
    }

    if (keywords) {
      line2 += `\\descript{| ${keywords.join(', ')}}`
    }

    if (url) {
      line2 += `\\hfill \\location{${url}}`
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
    const { title, summary, date, awarder } = award
    const info = [awarder, date].filter(Boolean).join(' | ')

    return stripIndent`
      \\runsubsection{\\large{${title || ''}}} \\descript{${info}} \\\\
      ${summary ? `${summary}\\\\` : ''}
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

module.exports = template4
