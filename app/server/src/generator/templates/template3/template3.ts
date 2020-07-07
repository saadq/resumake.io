import { stripIndent, source } from 'common-tags'
import { FormValues, TemplateGenerator } from '../../types'

const WHITESPACE = '\n\n'

const generator: TemplateGenerator = {
  createTexDefinitions() {
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
      \\newcommand{\\customsubsection}[4]{\\vspace{1.5mm}
        \\textbf{#1} \\hfill #2 \\hfill \\\\ \\textit{#3} \\hfill \\textit{#4}
      }
      \\newcommand{\\school}[4]{\\vspace{1.5mm}
        \\textbf{#1} \\hfill #2 \\textit{#3} \\hfill \\textit{#4} \\vspace{1.5mm}
      }
      \\newcommand{\\job}[4]{
        \\textbf{#1} \\hfill #2 \\hfill \\\\ \\textit{#3} \\hfill \\textit{#4}
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
  },

  createBasicsSection(basics) {
    const { name, email, phone, location = { address: '' }, website } = basics
    const info = [email, phone, location.address, website]
      .filter(Boolean)
      .join(' | ')

    return stripIndent`
      \\begin{tabular*}{7in}{l@{\\extracolsep{\\fill}}r}
      \\textbf{\\Large ${name}} & \\textit{${info}}
      \\end{tabular*}
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
    const bulletsSection = projects.map((project) => ({
      bullets: [],
      topLeftText: project.name,
      topRightText: project.keywords.join(', '),
      bottomLeftText: project.description,
      bottomRightText: project.url
    }))
    return this.createBulletsSection(bulletsSection, sectionName)
  },

  createAwardsSection(awards, sectionName) {
    const bulletsSection = awards.map((award) => ({
      bullets: [],
      topLeftText: award.title,
      topRightText: award.awarder,
      bottomLeftText: award.summary,
      bottomRightText: award.date
    }))
    return this.createBulletsSection(bulletsSection, sectionName)
  },

  createBulletsSection(section, sectionName) {
    return source`
      \\resheading{${sectionName || 'Bullets Section'}}
      \\begin{itemize}[leftmargin=*]
      ${section.map((subsection) => {
        return stripIndent`
          \\item[]
            \\customsubsection
              {${subsection.topLeftText || ''}}
              {${subsection.topRightText || ''}}
              {${subsection.bottomLeftText || ''}}
              {${subsection.bottomRightText || ''}}
              ${
                subsection.bullets.length > 1
                  ? source`
                  \\begin{itemize}
                    ${subsection.bullets.map((bullet) => `\\item ${bullet}`)}
                  \\end{itemize}
                `
                  : ''
              }
        `
      })}
      \\end{itemize}
    `
  },

  createTableSection(section, sectionName) {
    return source`
      \\resheading{${sectionName || 'Table Section'}}
      \\begin{itemize}[leftmargin=*]
      \\setlength\\itemsep{0em}
      ${section.map((subsection) => {
        const { name = '', keywords = [] } = subsection
        return `\\item[] \\skill{${name}}{${keywords.join(', ')}}`
      })}
      \\end{itemize}
    `
  },

  createParagraphSection(section, sectionName) {
    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\resheading{${sectionName || 'Paragraph Section'}}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\begin{itemize}[leftmargin=*]
      ${section.map((subsection) => {
        return stripIndent`
          \\item[]
            \\customsubsection
              {${subsection.topLeftText || ''}}
              {${subsection.topRightText || ''}}
              {${subsection.bottomLeftText || ''}}
              {${subsection.bottomRightText || ''}}
              ${subsection.paragraph ? `\\\\${subsection.paragraph}` : ''}
        `
      })}
      \\end{itemize}
    `
  }
}

export function template3(values: FormValues) {
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
