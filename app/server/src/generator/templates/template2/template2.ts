/**
 * @flow
 */

import { stripIndent, source } from 'common-tags'
import { FormValues, TemplateGenerator } from '../../types'

const WHITESPACE = '\n\n'

const generator: TemplateGenerator = {
  createTexDefinitions() {
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
  },

  createBasicsSection(basics) {
    const { name, email, phone, location = { address: '' }, website } = basics

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

  createEducationSection(education, sectionName) {
    const paragraphSection = education.map((school) => ({
      paragraph: school.gpa,
      topLeftText: school.institution,
      topRightText: school.location,
      bottomLeftText: [school.studyType, school.area].filter(Boolean).join(' '),
      bottomRightText: [school.startDate, school.endDate]
        .filter(Boolean)
        .join(' - ')
    }))

    return this.createParagraphSection(paragraphSection, sectionName)
  },

  createWorkSection(jobs, sectionName) {
    const bulletsSection = jobs.map((job) => ({
      bullets: job.highlights,
      topLeftText: job.company,
      topRightText: job.location,
      bottomLeftText: job.position,
      bottomRightText: [job.startDate, job.endDate].filter(Boolean).join(' - ')
    }))

    return this.createBulletsSection(bulletsSection, sectionName)
  },

  createSkillsSection(skills, sectionName) {
    return this.createTableSection(skills, sectionName)
  },

  createProjectsSection(projects, sectionName) {
    const paragraphSection = projects.map((project) => ({
      paragraph: '',
      topLeftText: project.name,
      topRightText: project.url,
      bottomLeftText: project.description,
      bottomRightText: project.keywords.join(', ')
    }))

    return this.createParagraphSection(paragraphSection, sectionName)
  },

  createAwardsSection(awards, sectionName) {
    const paragraphSection = awards.map((award) => ({
      paragraph: '',
      topLeftText: award.title,
      topRightText: award.awarder,
      bottomLeftText: award.summary,
      bottomRightText: award.date
    }))

    return this.createParagraphSection(paragraphSection, sectionName)
  },

  createBulletsSection(section, sectionName) {
    if (!section) {
      return ''
    }

    return source`
      %==== ${sectionName || 'BULLETS SECTION'} ====%
      \\cvsection{${sectionName || 'Bullets Section'}}
      \\begin{cventries}
      ${section.map((subsection) => {
        const bulletLines = subsection.bullets
          ? source`
              \\begin{cvitems} \\itemsep 1pt
                ${subsection.bullets.map((highlight) => `\\item ${highlight}`)}
              \\end{cvitems}
            `
          : ''
        return stripIndent`
          \\cventry
            {${subsection.bottomLeftText || ''}}
            {${subsection.topLeftText || ''}}
            {${subsection.topRightText || ''}}
            {${subsection.bottomRightText || ''}}
            {${bulletLines}}
        `
      })}
      \\end{cventries}
    `
  },

  createTableSection(section, sectionName) {
    return source`
          \\cvsection{${sectionName || 'Table'}}
          \\begin{cventries}
          \\cventry
          {}
          {\\def\\arraystretch{1.15}{\\begin{tabular}{ l l }
          ${section.map((subsection) => {
            const { name, keywords = [] } = subsection
            const nameLine = name || ''
            const keywordsLine = `{\\skill{ ${keywords.join(', ') || ''}}}`
            return `${nameLine} & ${keywordsLine} \\\\`
          })}
          \\end{tabular}}}
          {}
          {}
          {}
          \\end{cventries}
          \\vspace{-7mm}
        `
  },

  createParagraphSection(section, sectionName) {
    return source`
      \\cvsection{${sectionName || 'Education'}}
      \\begin{cventries}
      ${section.map((subsection) => {
        return stripIndent`
          \\cventry
            {${subsection.bottomLeftText || ''}}
            {${subsection.topLeftText || ''}}
            {${subsection.topRightText || ''}}
            {${subsection.bottomRightText}}
            {${subsection.paragraph || ''}}
        `
      })}
      \\end{cventries}
      \\vspace{-2mm}
    `
  }
}

export function template2(values: FormValues) {
  return stripIndent`
    ${generator.createTexDefinitions()}

    \\begin{document}
    ${values.sections
      .filter((section) => values[section.name] != null)
      .map((section) => {
        switch (section.name) {
          case 'basics':
            return generator.createBasicsSection(values.basics)

          case 'education':
            return generator.createEducationSection(
              values.education,
              section.displayName || section.name
            )

          case 'work':
            return generator.createWorkSection(
              values.work,
              section.displayName || section.name
            )

          case 'skills':
            return generator.createSkillsSection(
              values.skills,
              section.displayName || section.name
            )

          case 'projects':
            return generator.createProjectsSection(
              values.projects,
              section.displayName || section.name
            )

          case 'awards':
            return generator.createAwardsSection(
              values.awards,
              section.displayName || section.name
            )

          default:
            if (section.type === 'bullets') {
              return generator.createBulletsSection(
                values[section.name],
                section.displayName || section.name
              )
            }

            if (section.type === 'table') {
              return generator.createTableSection(
                values[section.name],
                section.displayName || section.name
              )
            }

            if (section.type === 'paragraph') {
              return generator.createParagraphSection(
                values[section.name],
                section.displayName || section.name
              )
            }
        }
      })
      .join('\n')}

    ${WHITESPACE}
    \\end{document}
  `
}
