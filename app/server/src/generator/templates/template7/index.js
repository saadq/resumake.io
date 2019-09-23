/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues, Generator } from '../../../types'

type Template7Generator = Generator & {
  resumeHeader: () => string
}

const generator: Template7Generator = {
  profileSection(basics = {}) {
    const { name, email, phone, location = {}, website } = basics

    return stripIndent`
    % Profile
    \\name{${name || ''}}{}
    \\address{${location.address || ''}}
    ${phone ? `\\phone[mobile]{${phone}}` : ''}
    ${email ? `\\email{${email || ''}}` : ''}
    ${website ? `\\homepage{${website || ''}}` : ''}
  `
  },

  aboutSection(basics, heading) {
    if (!basics || !basics.summary) {
      return ''
    }

    return source`
      \\section{${heading || 'About'}}
      \\cvitem{}{${basics.summary}}
    `
  },

  educationSection(education, heading) {
    if (!education) {
      return ''
    }

    return source`
      \\section{${heading || 'Education'}}
      ${education.map(school => {
        const {
          institution,
          studyType,
          area,
          gpa,
          location,
          startDate,
          endDate
        } = school

        let degreeLine = ''

        if (studyType && area) {
          degreeLine = `${studyType} in ${area}`
        } else if (studyType || area) {
          degreeLine = studyType || area
        }

        let dateRange = ''

        if (startDate && endDate) {
          dateRange = `${startDate} | ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} | Present`
        } else {
          dateRange = endDate
        }

        return stripIndent`
          \\cventry
            {${dateRange || ''}}
            {${degreeLine}}
            {${institution || ''}}
            {${gpa ? `GPA: ${gpa}` : ''}}
            {\\textit{${location || ''}}}
            {}
        `
      })}
    `
  },

  workSection(work, heading) {
    if (!work) {
      return ''
    }

    return source`
      \\section{${heading || 'Experience'}}
      ${work.map(job => {
        const {
          company,
          position,
          location,
          startDate,
          endDate,
          highlights
        } = job

        let dateRange = ''
        let highlightLines = ''

        if (startDate && endDate) {
          dateRange = `${startDate} -- ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} -- Present`
        } else {
          dateRange = endDate
        }

        if (highlights) {
          highlightLines = source`
            \\begin{itemize}%
              ${highlights.map(highlight => `\\item ${highlight}`)}
            \\end{itemize}
            `
        }

        return stripIndent`
          \\cventry
            {${dateRange || ''}}
            {${position || ''}}
            {${company || ''}}
            {${location || ''}}
            {}
            {${highlightLines}}
        `
      })}
    `
  },

  skillsSection(skills, heading) {
    if (!skills) {
      return ''
    }

    return source`
      \\section{${heading || 'Skills'}}
      ${skills.map(skill => {
        const { name, keywords = [] } = skill
        return `\\cvitem{${name || ''}}{${keywords.join(', ')}}`
      })}
    `
  },

  projectsSection(projects, heading) {
    if (!projects) {
      return ''
    }

    return source`
      \\section{${heading || 'Projects'}}
      ${projects.map(project => {
        const { name, description, keywords = [], url } = project

        let detailsLine = ''

        if (description) {
          detailsLine += `${description}\\\\`
        }

        if (url) {
          detailsLine += url
        }

        return stripIndent`
          \\cventry
            {}
            {${name || ''}}
            {}
            {\\textit{${keywords.join(', ')}}}
            {}
            {${detailsLine}}
          \\vspace{1mm}
        `
      })}
    `
  },

  awardsSection(awards, heading) {
    if (!awards) {
      return ''
    }

    return source`
      \\section{${heading || 'Awards'}}
      ${awards.map(award => {
        const { title, summary, date, awarder } = award

        let detailsLine = ''

        if (summary) {
          detailsLine += `${summary}\\\\`
        }

        if (awarder) {
          detailsLine += awarder
        }

        return stripIndent`
          \\cventry
            {}
            {${title || ''}}
            {}
            {\\textit{${date || ''}}}
            {}
            {${detailsLine}}
          \\vspace{1mm}
        `
      })}
    `
  },

  resumeHeader() {
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
}

function template7(values: SanitizedValues) {
  const { headings = {} } = values

  return stripIndent`
    ${generator.resumeHeader()}
    ${generator.profileSection(values.basics)}
    \\begin{document}
    ${values.basics ? '\\makecvtitle' : ''}
    ${values.sections
      .map(section => {
        switch (section) {
          case 'about':
            return generator.aboutSection
              ? generator.aboutSection(values.basics, headings.about)
              : ''

          case 'education':
            return generator.educationSection(
              values.education,
              headings.education
            )

          case 'work':
            return generator.workSection(values.work, headings.work)

          case 'skills':
            return generator.skillsSection(values.skills, headings.skills)

          case 'projects':
            return generator.projectsSection(values.projects, headings.projects)

          case 'awards':
            return generator.awardsSection(values.awards, headings.awards)

          default:
            return ''
        }
      })
      .join('\n')}
    ${WHITESPACE}
    \\end{document}
  `
}

export default template7
