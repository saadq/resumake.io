const { stripIndent, source } = require('common-tags')
const { WHITESPACE } = require('../constants')

function template7({ profile, schools, jobs, skills, projects, awards }) {
  return stripIndent`
    ${generateHeader()}
    ${generateProfileSection(profile)}
    \\begin{document}
    ${profile ? '\\makecvtitle' : ''}
    ${generateEducationSection(schools)}
    ${generateExperienceSection(jobs)}
    ${generateSkillsSection(skills)}
    ${generateProjectsSection(projects)}
    ${generateAwardsSection(awards)}
    ${WHITESPACE}
    \\end{document}
  `
}

function generateProfileSection(profile = {}) {
  const { fullName, email, phoneNumber, address, link } = profile

  return stripIndent`
    % Profile
    \\name{${fullName || ''}}{}
    \\address{${address || ''}}
    ${phoneNumber ? `\\phone[mobile]{${phoneNumber}}` : ''}
    ${email ? `\\email{${email || ''}}` : ''}
    ${link ? `\\homepage{${link || ''}}` : ''}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    \\section{Education}
    ${schools.map(school => {
      const { name, degree, major, gpa, location, graduationDate } = school

      let degreeLine = ''

      if (degree && major) {
        degreeLine = `${degree} in ${major}`
      } else if (degree || major) {
        degreeLine = degree || major
      }

      return stripIndent`
        \\cventry
          {${graduationDate || ''}}
          {${degreeLine}}
          {${name || ''}}
          {${gpa ? `GPA: ${gpa}` : ''}}
          {\\textit{${location || ''}}}
          {}
      `
    })}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    \\section{Experience}
    ${jobs.map(job => {
      const { name, title, location, startDate, endDate, duties } = job

      let dateRange = ''
      let dutyLines = ''

      if (startDate && endDate) {
        dateRange = `${startDate} -- ${endDate}`
      } else if (startDate) {
        dateRange = `${startDate} -- Present`
      } else {
        dateRange = endDate
      }

      if (duties) {
        dutyLines = source`
          \\begin{itemize}%
            ${duties.map(duty => `\\item ${duty}`)}
          \\end{itemize}
        `
      }

      return stripIndent`
        \\cventry
          {${dateRange || ''}}
          {${title || ''}}
          {${name || ''}}
          {${location || ''}}
          {}
          {${dutyLines}}
      `
    })}
  `
}

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
    \\section{Skills}
    ${skills.map(skill => `\\cvitem{${skill.name || ''}}{${skill.details || ''}}`)}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
    \\section{Projects}
    ${projects.map(project => {
      const { name, description, technologies, link } = project

      let detailsLine = ''

      if (description) {
        detailsLine += `${description}\\\\`
      }

      if (link) {
        detailsLine += link
      }

      return stripIndent`
        \\cventry
          {}
          {${name || ''}}
          {}
          {\\textit{${technologies || ''}}}
          {}
          {${detailsLine}}
        \\vspace{1mm}
      `
    })}
  `
}

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  return source`
    \\section{Awards}
    ${awards.map(award => {
      const { name, details, date, location } = award

      let detailsLine = ''

      if (details) {
        detailsLine += `${details}\\\\`
      }

      if (location) {
        detailsLine += location
      }

      return stripIndent`
        \\cventry
          {}
          {${name || ''}}
          {}
          {\\textit{${date || ''}}}
          {}
          {${detailsLine}}
        \\vspace{1mm}
      `
    })}
  `
}

function generateHeader() {
  return stripIndent`
    %% start of file 'template.tex'.
    %% Copyright 2006-2013 Xavier Danaux (xdanaux@gmail.com).
    %
    % This work may be distributed and/or modified under the
    % conditions of the LaTeX Project Public License version 1.3c,
    % available at http://www.latex-project.org/lppl/.


    \\documentclass[letterpaper]{moderncv}        % possible options include font size ('10pt', '11pt' and '12pt'), paper size ('a4paper', 'letterpaper', 'a5paper', 'legalpaper', 'executivepaper' and 'landscape') and font family ('sans' and 'roman')
    \\usepackage{textcomp}
    % moderncv themes
    \\moderncvstyle{classic}                             % style options are 'casual' (default), 'classic', 'oldstyle' and 'banking'
    \\moderncvcolor{blue}                               % color options 'blue' (default), 'orange', 'green', 'red', 'purple', 'grey' and 'black'
    %\\renewcommand{\\familydefault}{\\sfdefault}         % to set the default font; use '\\sfdefault' for the default sans serif font, '\\rmdefault' for the default roman one, or any tex font name
    %\\nopagenumbers{}                                  % uncomment to suppress automatic page numbering for CVs longer than one page

    % character encoding
    \\usepackage[utf8]{inputenc}                       % if you are not using xelatex ou lualatex, replace by the encoding you are using
    %\\usepackage{CJKutf8}                              % if you need to use CJK to typeset your resume in Chinese, Japanese or Korean

    % adjust the page margins
    \\usepackage[scale=0.75]{geometry}
    %\\setlength{\\hintscolumnwidth}{3cm}                % if you want to change the width of the column with the dates
    %\\setlength{\\makecvtitlenamewidth}{10cm}           % for the 'classic' style, if you want to force the width allocated to your name and avoid line breaks. be careful though, the length is normally calculated to avoid any overlap with your personal info; use this at your own typographical risks...
  `
}

module.exports = template7
