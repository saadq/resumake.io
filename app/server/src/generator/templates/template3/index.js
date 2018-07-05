/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues, Generator } from '../../../types'

type Template3Generator = Generator & {
  resumeHeader: () => string
}

const generator: Template3Generator = {
  profileSection(basics) {
    if (!basics) {
      return ''
    }

    const { name, email, phone, location = {}, website } = basics
    const info = [email, phone, location.address, website]
      .filter(Boolean)
      .join(' | ')

    return stripIndent`
      \\begin{tabular*}{7in}{l@{\\extracolsep{\\fill}}r}
      \\textbf{\\Large ${name}} & \\textit{${info}}
      \\end{tabular*}
    `
  },

  educationSection(education, heading) {
    if (!education) {
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\resheading{${heading || 'Education'}}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\begin{itemize}[leftmargin=*]

      ${education.map(school => {
        const {
          institution = '',
          location = '',
          studyType = '',
          area = '',
          gpa = '',
          startDate = '',
          endDate = ''
        } = school

        let formattedLocation = ''

        if (location) {
          formattedLocation = location + '\\\\'
        }

        let degreeLine = ''

        if (studyType && area) {
          degreeLine = `${studyType} ${area}`
        } else if (studyType || area) {
          degreeLine = studyType || area
        }

        if (gpa) {
          degreeLine += degreeLine ? `, GPA: ${gpa}` : `GPA: ${gpa}`
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
          \\item[]
            \\school
              {${institution || ''}}
              {${formattedLocation || ''}}
              {${degreeLine}}
              {${dateRange || ''}}
        `
      })}

      \\end{itemize}
    `
  },

  workSection(work, heading) {
    if (!work) {
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\resheading{${heading || 'Experience'}}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\begin{itemize}[leftmargin=*]
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
        let dutyLines = ''

        if (startDate && endDate) {
          dateRange = `${startDate} | ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} | Present`
        } else {
          dateRange = endDate
        }

        if (highlights) {
          dutyLines = source`
            \\begin{itemize}
              ${highlights.map(duty => `\\item ${duty}`)}
            \\end{itemize}
            `
        }

        return stripIndent`
          \\item[]
            \\job
              {${company || ''}}
              {${location || ''}}
              {${position || ''}}
              {${dateRange || ''}}
              ${dutyLines}
        `
      })}
      \\end{itemize}
    `
  },

  skillsSection(skills, heading) {
    if (!skills) {
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\resheading{${heading || 'Skills'}}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\begin{itemize}[leftmargin=*]
      \\setlength\\itemsep{0em}
      ${skills.map(skill => {
        const { name = '', keywords = [] } = skill
        return `\\item[] \\skill{${name}}{${keywords.join(', ')}}`
      })}
      \\end{itemize}
    `
  },

  projectsSection(projects, heading) {
    if (!projects) {
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\resheading{${heading || 'Projects'}}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\begin{itemize}[leftmargin=*]
      ${projects.map(project => {
        const { name = '', description = '', keywords = [], url = '' } = project

        const descriptionWithNewline = description
          ? `\\\\${description}`
          : description

        return stripIndent`
          \\item[]
            \\project
              {${name}}
              {${keywords.join(', ')}}
              {${url}}
              {${descriptionWithNewline}}
        `
      })}
      \\end{itemize}
    `
  },

  awardsSection(awards, heading) {
    if (!awards) {
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\resheading{${heading || 'Awards'}}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\begin{itemize}[leftmargin=*]
      ${awards.map(award => {
        const { title = '', summary = '', date = '', awarder = '' } = award

        const summaryWithNewline = summary ? `\\\\${summary}` : summary

        return stripIndent`
          \\item[]
            \\award
              {${title}}
              {${date}}
              {${awarder}}
              {${summaryWithNewline}}
        `
      })}
      \\end{itemize}
    `
  },

  resumeHeader() {
    return stripIndent`
      % (c) 2002 Matthew Boedicker <mboedick@mboedick.org> (original author) http://mboedick.org
      % (c) 2003-2007 David J. Grant <davidgrant-at-gmail.com> http://www.davidgrant.ca
      % (c) 2008 Nathaniel Johnston <nathaniel@nathanieljohnston.com> http://www.nathanieljohnston.com
      %
      % (c) 2012 Scott Clark <sc932@cornell.edu> cam.cornell.edu/~sc932
      %
      %This work is licensed under the Creative Commons Attribution-Noncommercial-Share Alike 2.5 License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/ or send a letter to Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.

      \\documentclass[11pt]{article}
      \\newlength{\\outerbordwidth}
      \\pagestyle{empty}
      \\raggedbottom
      \\raggedright
      \\usepackage[svgnames]{xcolor}
      \\usepackage{framed}
      \\usepackage{tocloft}
      \\usepackage{enumitem}
      \\usepackage{textcomp}
      \\usepackage[utf8]{inputenc}
      \\usepackage[T1]{fontenc}


      %-----------------------------------------------------------
      %Edit these values as you see fit

      \\setlength{\\outerbordwidth}{3pt}  % Width of border outside of title bars
      \\definecolor{shadecolor}{gray}{0.75}  % Outer background color of title bars (0 = black, 1 = white)
      \\definecolor{shadecolorB}{gray}{0.93}  % Inner background color of title bars


      %-----------------------------------------------------------
      %Margin setup

      \\setlength{\\evensidemargin}{-0.25in}
      \\setlength{\\headheight}{0in}
      \\setlength{\\headsep}{0in}
      \\setlength{\\oddsidemargin}{-0.25in}
      \\setlength{\\tabcolsep}{0in}
      \\setlength{\\textheight}{9.5in}
      \\setlength{\\textwidth}{7in}
      \\setlength{\\topmargin}{-0.3in}
      \\setlength{\\topskip}{0in}
      \\setlength{\\voffset}{0.1in}


      %-----------------------------------------------------------
      %Custom commands
      \\newcommand{\\resitem}[1]{\\item #1 \\vspace{-4pt}}
      \\newcommand{\\resheading}[1]{
        \\parbox{\\textwidth}{\\setlength{\\FrameSep}{\\outerbordwidth}
          \\begin{shaded}
      \\setlength{\\fboxsep}{0pt}\\framebox[\\textwidth][l]{\\setlength{\\fboxsep}{4pt}\\fcolorbox{shadecolorB}{shadecolorB}{\\textbf{\\sffamily{\\mbox{~}\\makebox[6.762in][l]{\\large #1} \\vphantom{p\\^{E}}}}}}
          \\end{shaded}
        }\\vspace{-11pt}
      }
      \\newcommand{\\ressubheading}[4]{
      \\begin{tabular*}{6.5in}{l@{\\cftdotfill{\\cftsecdotsep}\\extracolsep{\\fill}}r}
          \\textbf{#1} & #2 \\\\
          \\textit{#3} & \\textit{#4} \\\\

      \\end{tabular*}\\vspace{-6pt}}

      \\newcommand{\\school}[4]{\\vspace{1.5mm}
        \\textbf{#1} \\hfill #2 \\textit{#3} \\hfill \\textit{#4} \\vspace{1.5mm}
      }

      \\newcommand{\\job}[4]{
        \\textbf{#1} \\hfill #2 \\hfill \\textit{#3} \\hfill \\textit{#4}
      }

      \\newcommand{\\skill}[2]{
        \\textbf{#1} #2
      }

      \\newcommand{\\project}[4]{ \\vspace{1.5mm}
        \\textbf{#1} #2 \\hfill \\textit{#3}#4 \\vspace{1.5mm}
      }

      \\newcommand{\\award}[4]{ \\vspace{1.5mm}
        \\textbf{#1} #2 \\hfill \\textit{#3} #4 \\vspace{1.5mm}
      }
      %-----------------------------------------------------------
    `
  }
}

function template3(values: SanitizedValues) {
  const { headings = {} } = values

  return stripIndent`
    ${generator.resumeHeader()}
    \\begin{document}
    ${values.sections
      .map(section => {
        switch (section) {
          case 'profile':
            return generator.profileSection(values.basics)

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

export default template3
