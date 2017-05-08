const { stripIndent, source } = require('common-tags')

function template2({ profile, schools, jobs, projects, skills }) {
  return stripIndent`
    ${generateCommentHeader()}
    \\documentclass[]{deedy-resume-openfont}

    \\begin{document}
      ${generateProfileSection(profile)}
      ${generateEducationSection(schools)}

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Experience
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Experience}

    \\runsubsection{Mozilla} \\descript{| Software Engineer Intern} \\hfill \\location{Mountain View, CA | Jun 2016 – Aug 2016}
    % \\vspace{\\topsep} % Hacky fix for awkward extra vertical space
    \\begin{tightemize}
    \\item Broadened search criteria for Firefox’s context menu to include subdomains in password suggestions.
    \\item Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.
    \\item Fixed regressions for Firefox Electrolysis and improved dialogs and notification popups.
    \\item te
    \\end{tightemize}
    \\sectionsep

    \\runsubsection{Codecademy} \\descript{| Coding Advisor} \\hfill \\location{Manhattan, NY | Dec 2015 – May 2016}
    % \\vspace{\\topsep} % Hacky fix for awkward extra vertical space
    \\begin{tightemize}
    \\item Created a JavaScript project for Codecademy Pro members now available in the new JS course.
    \\item Taught new coders how to avoid bugs and how to go through the process of fixing existing ones.
    \\item Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.
    \\end{tightemize}
    \\sectionsep

    \\runsubsection{IEEE} \\descript{| Application Developer Intern} \\hfill \\location{Piscataway, NJ | Jun 2015 – Nov 2015}
    % \\vspace{\\topsep} % Hacky fix for awkward extra vertical space
    \\begin{tightemize}
    \\item Wrote an API that allowed CRUD operations to be used for accessing and manipulating data involving current departments/groups/teams at IEEE.
    \\item Created a UI for admins that used the aforementioned API to automate the process of syncing departments/groups/teams on the site to relevant databases.
    \\item Improved the IEEE Innovate site by using cookies to display tailored web-content.
    \\end{tightemize}
    \\sectionsep

    \\runsubsection{Johnson \\& Johnson} \\descript{| Web Developer Intern} \\hfill \\location{Mountain View, CA | Jan 2015 – Jun 2015}
    % \\vspace{\\topsep} % Hacky fix for awkward extra vertical space
    \\begin{tightemize}
    \\item  Improved existing web pages by migrating inline-styling to external CSS files, and adding cross-browser compatibility.
    \\item Created SharePoint front-ends with HTML, CSS, and JavaScript and utilized the jQuery UI library to create responsive widgets.
    \\item Debugged original code base as the sole developer on the team and created a standard for SharePoint web part development for future employees.
    \\end{tightemize}
    \\sectionsep

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Skills
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Skills}
    \\begin{tabular}{ l l }
      \\descript{Programming Languages:} & {\\location{JavaScript, Java, Ruby, HTML, CSS}} \\\\

      \\descript{Frameworks/Libraries:} & {\\location{Node.js, Koa, Express, React, Redux, jQuery}} \\\\

      \\descript{Miscellaneous:} & {\\location{PostgreSQL, Bash, Git, SVN, Mercurial}} \\\\
    \\end{tabular}

    \\sectionsep


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Projects
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Projects}

    \\runsubsection{\\large{Resume Generator}}
    \\descript{| Node.js, Koa, React, Redux} \\hfill \\location{https://latexresu.me} \\\\
    A webapp for generating LaTeX resumes from form data (including this one).
    \\sectionsep

    \\runsubsection{\\large{Flow Timer}}
    \\descript{| Node.js, Koa, React, Redux} \\hfill \\location{https://flowtimer.com} \\\\
    A modern speedcubing app with a scrambler, timer, and analyzer for cubing statistics.
    \\sectionsep

    \\runsubsection{\\large{Reddit Image Scraper}}
    \\descript{| Ruby, Sinatra} \\hfill \\location{https://github.com/saadq/reddit-scraper} \\\\
    A web app that lets you view a collage of images/videos from a subreddit.
    \\sectionsep

    \\runsubsection{\\large{Anagrams}}
    \\descript{| HTML, CSS, JavaScript} \\hfill \\location{https://saadq.github.io/Anagrams} \\\\
    A cognitive, anagram-recognition game where the player must quickly find the answer.
    \\sectionsep

    \\runsubsection{\\large{Materialize}}
    \\descript{| XML, JSON} \\hfill \\location{https://packagecontrol.io/packages/Materialize} \\\\
    A collection of custom themes for Sublime Text, inspired by Material design with 30k+ installations.
    \\sectionsep


    \\end{document}  \\documentclass[]{article}
  `
}

function generateProfileSection(profile) {
  if (!profile) {
    return ''
  }

  const { fullName, email, phoneNumber, address, link } = profile

  let nameStart = ''
  let nameEnd = ''

  if (fullName) {
    const names = fullName.split(' ')

    if (names.length === 1) {
      nameStart = names[0]
      nameEnd = ''
    } else if (names.length === 2) {
      nameStart = names[0]
      nameEnd = names[1]
    } else {
      nameStart = names.slice(0, names.length - 1).join(' ')
      nameEnd = names[names.length - 1]
    }
  }

  const info = [email, phoneNumber, address, link].filter(Boolean).join(' | ')

  if (!fullName) {
    return stripIndent`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %
      %     Profile
      %
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\centering{
        \\color{headings}
        \\fontspec[Path = fonts/raleway/]{Raleway-Medium}
        \\fontsize{11pt}{14pt}
        \\selectfont ${info}
      }
    `
  }

  return stripIndent`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Profile
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\namesection{${nameStart}}{${nameEnd}}{${info}}
  `
}

function generateEducationSection(schools) {
  if (!schools) {
    return ''
  }

  return source`
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %
    %     Education
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\section{Education}
    ${schools.map((school) => {
      const { name, location, degree, major, gpa, graduationDate } = school

      let line1 = ''
      let line2 = ''

      if (name) {
        line1 += `\\runsubsection{\\noindent ${name}}`
      }

      if (degree && major) {
        line1 += `\\descript{| ${degree} ${major}}`
      } else if (degree) {
        line1 += `\\descript{| ${degree}}`
      } else if (major) {
        line1 += `\\descript{| ${major}}`
      } else {
        line1 += '\\descript{}'
      }

      const locationAndDate = [location, graduationDate].filter(Boolean).join(' | ')

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

module.exports = template2
