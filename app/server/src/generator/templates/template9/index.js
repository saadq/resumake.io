/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues } from '../../../types'

function template9({
  basics,
  education,
  work,
  projects,
  skills,
  awards
}: SanitizedValues) {
  return stripIndent`
    \\documentclass[fontsize=11pt]{article}
    ${generateHeader()}
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

function generateProfileSection(basics) {
  if (!basics) {
    return ''
  }

  const { name, email, phone, location = {}, website } = basics
  const info = [email, phone, location.address, website]
    .filter(Boolean)
    .join(' | ')

  return stripIndent`
    \\MyName{${name || ''}}
    \\bigskip
    {\\small \\hfill ${info || ''}}
  `
}

function generateEducationSection(education) {
  if (!education) {
    return ''
  }

  const lastSchoolIndex = education.length - 1

  return source`
  %%% Education
  %%% ------------------------------------------------------------
  \\NewPart{Education}{}
  ${education.map((school, i) => {
    const {
      institution = '',
      studyType,
      area,
      gpa = '',
      location = '',
      startDate = '',
      endDate = ''
    } = school

    let degreeLine = ''
    let nameLine = ''

    if (studyType && area) {
      degreeLine = `${studyType} ${area}`
    } else if (studyType || area) {
      degreeLine = studyType || area
    }

    let dateRange = ''

    if (startDate && endDate) {
      dateRange = `${startDate} - ${endDate}`
    } else if (startDate) {
      dateRange = `${startDate} - Present`
    } else {
      dateRange = endDate
    }

    if (institution && location) {
      nameLine += `${institution}, ${location}`
    } else if (institution || location) {
      nameLine = institution || location
    }

    if (gpa) {
      nameLine += ` ${gpa}`
    }

    return stripIndent`
    \\EducationEntry
        {${degreeLine}}
        {${dateRange || ''}}
        {${nameLine}${i < lastSchoolIndex ? '\\\\' : ''}}
    `
  })}
  `
}

function generateExperienceSection(work) {
  if (!work) {
    return ''
  }

  const lastJobIndex = work.length - 1

  return source`
    %%% Work experience
    %%% ------------------------------------------------------------
    \\NewPart{Work Experience}{}

    ${work.map((job, i) => {
      const {
        company,
        position,
        location,
        startDate,
        endDate,
        highlights
      } = job

      const nameLine = [company, location].filter(Boolean).join(', ')
      let dateRange = ''
      let dutyLines = ''

      if (startDate && endDate) {
        dateRange = `${startDate} - ${endDate}`
      } else if (startDate) {
        dateRange = `${startDate} - Present`
      } else {
        dateRange = endDate
      }

      if (highlights) {
        dutyLines = source`
            \\begin{itemize} \\itemsep -1pt
              ${highlights.map(duty => `\\item ${duty}`)}
            \\end{itemize}
          `
      }

      return stripIndent`
          \\WorkEntry
            {${position || ''}}
            {${dateRange || ''}}
            {${nameLine}}
            {${dutyLines}}
            ${i < lastJobIndex ? '\\sepspace' : ''}
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
  ${skills.map(skill => {
    const { name, keywords = [] } = skill
    return `\\SkillsEntry{${name || ''}}{${keywords.join(', ')}}`
  })}
  `
}

function generateProjectsSection(projects) {
  if (!projects) {
    return ''
  }

  const lastProjectIndex = projects.length - 1

  return source`
    %%% Projects
    %%% ------------------------------------------------------------
    \\NewPart{Projects}{}

    ${projects.map((project, i) => {
      const { name, description, keywords = [], url } = project

      return stripIndent`
          \\ProjectEntry{${name || ''}}{${url || ''}}
          {${keywords.join(', ')}}
          {${description || ''}}
          ${i < lastProjectIndex ? '\\sepspace' : ''}
      `
    })}

  `
}

function generateAwardsSection(awards) {
  if (!awards) {
    return ''
  }

  const lastAwardIndex = awards.length - 1

  return source`
    %%% Awards
    %%% ------------------------------------------------------------
    \\NewPart{Awards}{}

    ${awards.map((award, i) => {
      const { title, summary, date, awarder } = award

      return stripIndent`
          \\AwardEntry{${title || ''}}{${awarder || ''}}
          {${date || ''}}
          {${summary || ''}}
          ${i < lastAwardIndex ? '\\sepspace' : ''}
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
