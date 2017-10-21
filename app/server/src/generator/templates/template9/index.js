const { stripIndent, source } = require('common-tags')
const { WHITESPACE } = require('../constants')

function template9({ profile, schools, jobs, skills, projects, awards }) {
  return stripIndent`
    \\documentclass[fontsize=11pt]{article}
    ${generateHeader(profile)}
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
    \\MyName{${fullName || ''}}
    \\bigskip
    {\\small \\hfill ${info || ''}}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return `
    %%% Education
    %%% ------------------------------------------------------------
    \\NewPart{Education}{}
    ${schools
      .map((school, i) => {
        const { name, degree, major, gpa, location, graduationDate } = school

        let degreeLine = ''
        let nameLine = ''

        if (degree && major) {
          degreeLine = `${degree} ${major}`
        } else if (degree || major) {
          degreeLine = degree || major
        }

        if (name && location) {
          nameLine += `${name}, ${location}`
        } else if (name || location) {
          nameLine = name || location
        }

        if (gpa) {
          nameLine += ` ${gpa}`
        }

        return stripIndent`
        \\EducationEntry
            {${degreeLine}}
            {${graduationDate || ''}}
            {${nameLine}${i < schools.length - 1 ? '\\\\' : ''}}
      `
      })
      .join('\n\n')}
  `
}

function generateExperienceSection(jobs) {
  if (!jobs) {
    return ''
  }

  return source`
    %%% Work experience
    %%% ------------------------------------------------------------
    \\NewPart{Work Experience}{}

    ${jobs.map((job, i) => {
      const { name, title, location, startDate, endDate, duties } = job

      const nameLine = [name, location].filter(Boolean).join(', ')
      let dateRange = ''
      let dutyLines = ''

      if (startDate && endDate) {
        dateRange = `${startDate} - ${endDate}`
      } else if (startDate) {
        dateRange = `${startDate} - Present`
      } else {
        dateRange = endDate
      }

      if (duties) {
        dutyLines = source`
          \\begin{itemize} \\itemsep -1pt
            ${duties.map(duty => `\\item ${duty}`)}
          \\end{itemize}
        `
      }

      return stripIndent`
        \\WorkEntry
          {${title || ''}}
          {${dateRange || ''}}
          {${nameLine}}
          {${dutyLines}}
          ${i < jobs.length - 1 ? '\\sepspace' : ''}
      `
    })}
  `
}

function generateSkillsSection(skills) {
  if (!skills) {
    return ''
  }

  return source`
    %%% Skills
    %%% ------------------------------------------------------------
    \\NewPart{Skills}{}
    ${skills.map(skill => `\\SkillsEntry{${skill.name || ''}}{${skill.details || ''}}`)}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  return source`
    %%% Projects
    %%% ------------------------------------------------------------
    \\NewPart{Projects}{}

    ${projects.map((project, i) => {
      const { name, description, technologies, link } = project

      return stripIndent`
        \\ProjectEntry{${name || ''}}{${link || ''}}
        {${technologies || ''}}
        {${description || ''}}
        ${i < projects.length - 1 ? '\\sepspace' : ''}
      `
    })}

  `
}

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  return source`
    %%% Awards
    %%% ------------------------------------------------------------
    \\NewPart{Awards}{}

    ${awards.map((award, i) => {
      const { name, details, date, location } = award

      return stripIndent`
        \\AwardEntry{${name || ''}}{${location || ''}}
        {${date || ''}}
        {${details || ''}}
        ${i < awards.length - 1 ? '\\sepspace' : ''}
      `
    })}

  `
}

function generateHeader() {
  return stripIndent`
    \\usepackage[english]{babel}
    \\usepackage[utf8x]{inputenc}
    \\usepackage[protrusion=true,expansion=true]{microtype}
    \\usepackage[svgnames]{xcolor}  % Colours by their 'svgnames'
    \\usepackage[margin=0.75in]{geometry}
      \\textheight=700px
    \\usepackage{url}
    \\usepackage{lmodern} % Allow arbitrary font sizes
    \\usepackage{textcomp}

    %% Define a new 'modern' style for the url package that will use a smaller font.
    \\makeatletter
    \\def\\url@modernstyle{
      \\@ifundefined{selectfont}{\\def\\UrlFont{\\sf}}{\\def\\UrlFont{}}}
    \\makeatother
    \\urlstyle{modern} %% And use the newly defined style.

    \\frenchspacing              % Better looking spacings after periods
    \\pagestyle{empty}           % No pagenumbers/headers/footers

    \\renewcommand{\\familydefault}{\\sfdefault}

    %%% Custom sectioning (sectsty package)
    %%% ------------------------------------------------------------
    \\usepackage{sectsty}

    \\sectionfont{                 % Change font of \\section command
      \\usefont{OT1}{phv}{b}{n}%   % bch-b-n: CharterBT-Bold font
      \\sectionrule{0pt}{0pt}{-5pt}{3pt}}

    %%% Macros
    %%% ------------------------------------------------------------
    \\newlength{\\spacebox}
    \\settowidth{\\spacebox}{8888888888}      % Box to align text
    \\newcommand{\\sepspace}{\\vspace*{1em}}   % Vertical space macro

    \\newcommand{\\MyName}[1]{ % Name
        \\Huge \\usefont{OT1}{phv}{b}{n} \\hfill #1
        \\par \\normalsize \\normalfont}

    \\newcommand{\\MySlogan}[1]{ % Slogan (optional)
        \\large \\usefont{OT1}{phv}{m}{n}\\hfill \\textit{#1}
        \\par \\normalsize \\normalfont}

    \\newcommand{\\NewPart}[1]{\\section*{\\uppercase{#1}}}

    \\newcommand{\\PersonalEntry}[2]{
        \\noindent\\hangindent=2em\\hangafter=0 % Indentation
        \\parbox{\\spacebox}{                  % Box to align text
        \\textit{#1}}                      % Entry name (birth, address, etc.)
        \\hspace{1.5em} #2 \\par}              % Entry value

    \\newcommand{\\SkillsEntry}[2]{                % Same as \\PersonalEntry
        \\noindent\\hangindent=2em\\hangafter=0 % Indentation
        \\parbox{\\spacebox}{                  % Box to align text
        \\textit{#1}}                    % Entry name (birth, address, etc.)
        \\hspace{1.5em} #2 \\par}              % Entry value

    \\newcommand{\\AwardsEntry}[2]{                % Same as \\PersonalEntry
        \\noindent\\hangindent=2em\\hangafter=0 % Indentation
        \\parbox{\\spacebox}{                  % Box to align text
        \\textit{#1}}                    % Entry name (birth, address, etc.)
        \\hspace{1.5em} #2 \\par}              % Entry value

    \\newcommand{\\EducationEntry}[4]{
        \\noindent \\textbf{#1} \\hfill      % Study
        \\colorbox{Black}{
          \\parbox{8.5em}{
          \\hfill\\color{White}#2}} \\par  % Duration
        \\noindent \\textit{#3} \\par        % School
        \\noindent\\hangindent=2em\\hangafter=0 \\small #4 % Description
        \\normalsize \\par}

    \\newcommand{\\WorkEntry}[4]{       % Same as \\EducationEntry
        \\noindent \\textbf{#1} \\hfill      % Jobname
        \\colorbox{Black}{%
          \\parbox{9em}{%
          \\hfill\\color{White}#2}} \\par   % Duration
            \\noindent \\textit{#3} \\par        % Company
        \\noindent\\hangindent=2em\\hangafter=0 \\small #4 % Description
        \\normalsize \\par}

    \\newcommand{\\ProjectEntry}[4]{         % Similar to \\EducationEntry
        \\noindent \\textbf{#1} \\noindent \\textit{#3} \\hfill {#2} \\par
        \\noindent \\small #4 % Description
        \\normalsize \\par}

    \\newcommand{\\AwardEntry}[4]{         % Similar to \\EducationEntry
        \\noindent \\textbf{#1} \\noindent \\textit{#3} \\hfill {#2} \\par
        \\noindent \\small #4 % Description
        \\normalsize \\par}
  `
}

module.exports = template9
