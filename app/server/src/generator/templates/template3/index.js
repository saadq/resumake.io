const { stripIndent, source } = require('common-tags')
const { WHITESPACE } = require('../constants')

function template3({ profile, schools, jobs, projects, skills, awards }) {
  return stripIndent`
    ${generateHeader()}
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
    return ''
  }

  const { fullName, email, phoneNumber, address, link } = profile
  const info = [email, phoneNumber, address, link].filter(Boolean).join(' | ')

  return stripIndent`
    \\begin{tabular*}{7in}{l@{\\extracolsep{\\fill}}r}
    \\textbf{\\Large ${fullName}} & \\textit{${info}}
    \\end{tabular*}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\resheading{Education}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\begin{itemize}[leftmargin=*]

    ${schools.map(school => {
      const { name, location, degree, major, gpa, graduationDate } = school

      let degreeLine = ''

      if (degree && major) {
        degreeLine = `${degree} in ${major}`
      } else if (degree || major) {
        degreeLine = degree || major
      }

      if (gpa) {
        degreeLine += degreeLine ? `, GPA: ${gpa}` : gpa
      }

      return stripIndent`
        \\item[]
          \\school
            {${name || ''}}
            {${location || ''}}
            {${degreeLine}}
            {${graduationDate || ''}}
      `
    })}

    \\end{itemize}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\resheading{Experience}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\begin{itemize}[leftmargin=*]
    ${jobs.map(job => {
      const { name, title, location, startDate, endDate, duties } = job

      let dateRange = ''
      let dutyLines = ''

      if (startDate && endDate) {
        dateRange = `${startDate} | ${endDate}`
      } else if (startDate) {
        dateRange = `${startDate} | Present`
      } else {
        dateRange = endDate
      }

      if (duties) {
        dutyLines = source`
          \\begin{itemize}
            ${duties.map(duty => `\\item ${duty}`)}
          \\end{itemize}
        `
      }

      return stripIndent`
        \\item[]
          \\job
            {${name || ''}}
            {${location || ''}}
            {${title || ''}}
            {${dateRange || ''}}
            ${dutyLines}
      `
    })}
    \\end{itemize}
  `
}

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\resheading{Skills}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\begin{itemize}[leftmargin=*]
    \\setlength\\itemsep{0em}
    ${skills.map(skill => `\\item[] \\skill{${skill.name}}{${skill.details}}`)}
    \\end{itemize}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\resheading{Projects}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\begin{itemize}[leftmargin=*]
    ${projects.map(project => {
      const { name, description, technologies, link } = project

      return stripIndent`
        \\item[]
            \\project
                {${name || ''}}
                {${technologies || ''}}
                {${link || ''}}
                {${description || ''}}
      `
    })}
    \\end{itemize}
  `
}

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\resheading{Awards}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\begin{itemize}[leftmargin=*]
    ${awards.map(award => {
      const { name, details, date, location } = award

      return stripIndent`
        \\item[]
            \\award
                {${name || ''}}
                {${date || ''}}
                {${location || ''}}
                {${details || ''}}
      `
    })}
    \\end{itemize}
  `
}

function generateHeader() {
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
      \\textbf{#1} \\hfill #2 \\hfill \\\\ \\textit{#3} \\hfill \\textit{#4} \\\\ \\vspace{1.5mm}
    }

    \\newcommand{\\job}[4]{
      \\textbf{#1} \\hfill #2 \\hfill \\\\ \\textit{#3} \\hfill \\textit{#4}
    }

    \\newcommand{\\skill}[2]{
      \\textbf{#1} #2 \\\\
    }

    \\newcommand{\\project}[4]{ \\vspace{1.5mm}
      \\textbf{#1} #2 \\hfill \\textit{#3} \\\\ #4 \\\\ \\vspace{1.5mm}
    }

    \\newcommand{\\award}[4]{ \\vspace{1.5mm}
      \\textbf{#1} #2 \\hfill \\textit{#3} \\\\ #4 \\\\ \\vspace{1.5mm}
    }
    %-----------------------------------------------------------
  `
}

module.exports = template3
