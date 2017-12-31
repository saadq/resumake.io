/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from '../constants'
import type { SanitizedValues, Generator } from '../../../types'

type Template2Generator = Generator & {
  resumeHeader: () => string
}

const generator: Template2Generator = {
  profileSection(basics) {
    if (!basics) {
      return ''
    }

    const { name, email, phone, location = {}, website } = basics

    let nameLine = ''

    if (name) {
      const names = name.split(' ')
      let nameStart = ''
      let nameEnd = ''

      if (names.length === 1) {
        nameStart = names[0]
      } else {
        nameStart = names[0]
        nameEnd = names.slice(1, names.length).join(' ')
      }

      nameLine = `\\headerfirstnamestyle{${nameStart}} \\headerlastnamestyle{${nameEnd}} \\\\`
    }

    const emailLine = email ? `{\\faEnvelope\\ ${email}}` : ''
    const phoneLine = phone ? `{\\faMobile\\ ${phone}}` : ''
    const addressLine = location.address
      ? `{\\faMapMarker\\ ${location.address}}`
      : ''
    const websiteLine = website ? `{\\faLink\\ ${website}}` : ''
    const info = [emailLine, phoneLine, addressLine, websiteLine]
      .filter(Boolean)
      .join(' | ')

    return stripIndent`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Profile
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\begin{center}
      ${nameLine}
      \\vspace{2mm}
      ${info}
      \\end{center}
    `
  },

  educationSection(education) {
    if (!education || !education.schools) {
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Education
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\cvsection{${education.heading || 'Education'}}
      \\begin{cventries}
      ${education.schools.map(school => {
        const {
          institution,
          location,
          area,
          studyType,
          gpa,
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
          dateRange = `${startDate} – ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} – Present`
        } else {
          dateRange = endDate
        }

        return stripIndent`
          \\cventry
            {${degreeLine}}
            {${institution || ''}}
            {${location || ''}}
            {${dateRange}}
            {${gpa ? `GPA: ${gpa}` : ''}}
        `
      })}
      \\end{cventries}

      \\vspace{-2mm}
    `
  },

  workSection(work) {
    if (!work || !work.jobs) {
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Experience
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\cvsection{${work.heading || 'Experience'}}
      \\begin{cventries}
      ${work.jobs.map(job => {
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
          dateRange = `${startDate} – ${endDate}`
        } else if (startDate) {
          dateRange = `${startDate} – Present`
        } else {
          dateRange = endDate
        }

        if (highlights) {
          dutyLines = source`
            \\begin{cvitems}
              ${highlights.map(duty => `\\item {${duty}}`)}
            \\end{cvitems}
            `
        }

        return stripIndent`
          \\cventry
            {${position || ''}}
            {${company || ''}}
            {${location || ''}}
            {${dateRange || ''}}
            {${dutyLines}}
        `
      })}
      \\end{cventries}
    `
  },

  skillsSection(skills) {
    if (!skills || !skills.skills) {
      return ''
    }

    return source`
      \\cvsection{${skills.heading || 'Skills'}}
      \\begin{cventries}
      \\cventry
      {}
      {\\def\\arraystretch{1.15}{\\begin{tabular}{ l l }
      ${skills.skills.map(skill => {
        const { name, keywords = [] } = skill
        const nameLine = name ? `${name}: ` : ''
        const detailsLine = `{\\skill{ ${keywords.join(', ') || ''}}}`

        return `${nameLine} & ${detailsLine} \\\\`
      })}
      \\end{tabular}}}
      {}
      {}
      {}
      \\end{cventries}

      \\vspace{-7mm}
    `
  },

  projectsSection(projects) {
    if (!projects || !projects.projects) {
      return ''
    }

    return source`
      \\cvsection{${projects.heading || 'Projects'}}
      \\begin{cventries}
      ${projects.projects.map(project => {
        const { name, description, keywords = [], url } = project

        return stripIndent`
          \\cventry
            {${description || ''}}
            {${name || ''}}
            {${keywords.join(', ') || ''}}
            {${url || ''}}
            {}

          \\vspace{-5mm}
        `
      })}
      \\end{cventries}
    `
  },

  awardsSection(awards) {
    if (!awards || !awards.awards) {
      return ''
    }

    return source`
      \\cvsection{${awards.heading || 'Awards'}}
      \\begin{cvhonors}
      ${awards.awards.map(award => {
        const { title, summary, date, awarder } = award

        return stripIndent`
          \\cvhonor
            {${title || ''}}
            {${summary || ''}}
            {${awarder || ''}}
            {${date || ''}}
        `
      })}
      \\end{cvhonors}
    `
  },

  resumeHeader() {
    return stripIndent`
    %!TEX TS-program = xelatex
    %!TEX encoding = UTF-8 Unicode
    % Awesome CV LaTeX Template
    %
    % This template has been downloaded from:
    % https://github.com/posquit0/Awesome-CV
    %
    % Author:
    % Claud D. Park <posquit0.bj@gmail.com>
    % http://www.posquit0.com
    %
    % Template license:
    % CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
    %


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %     Configuration
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%% Themes: Awesome-CV
    \\documentclass[]{awesome-cv}
    \\usepackage{textcomp}
    %%% Override a directory location for fonts(default: 'fonts/')
    \\fontdir[fonts/]

    %%% Configure a directory location for sections
    \\newcommand*{\\sectiondir}{resume/}

    %%% Override color
    % Awesome Colors: awesome-emerald, awesome-skyblue, awesome-red, awesome-pink, awesome-orange
    %                 awesome-nephritis, awesome-concrete, awesome-darknight
    %% Color for highlight
    % Define your custom color if you don't like awesome colors
    \\colorlet{awesome}{awesome-red}
    %\\definecolor{awesome}{HTML}{CA63A8}
    %% Colors for text
    %\\definecolor{darktext}{HTML}{414141}
    %\\definecolor{text}{HTML}{414141}
    %\\definecolor{graytext}{HTML}{414141}
    %\\definecolor{lighttext}{HTML}{414141}

    %%% Override a separator for social informations in header(default: ' | ')
    %\\headersocialsep[\\quad\\textbar\\quad]
  `
  }
}

function template2(values: SanitizedValues) {
  return stripIndent`
    ${generator.resumeHeader()}
    \\begin{document}
    ${values.orderedSections.map(section => {
      switch (section) {
        case 'profile':
          return generator.profileSection(values.basics)

        case 'education':
          return generator.educationSection(values.education)

        case 'work':
          return generator.workSection(values.work)

        case 'skills':
          return generator.skillsSection(values.skills)

        case 'projects':
          return generator.projectsSection(values.projects)

        case 'awards':
          return generator.awardsSection(values.awards)

        default:
          return ''
      }
    }).join('\n')}
    ${WHITESPACE}
    \\end{document}
  `
}

export default template2
