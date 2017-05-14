const { stripIndent, source } = require('common-tags')

function template7({ profile, schools, jobs, skills, projects }) {
  return stripIndent`
    ${generateHeader()}
    ${generateProfileSection(profile)}
    \\begin{document}
    ${profile ? '\\makecvtitle' : ''}
    ${generateEducationSection(schools)}
    \\section{Experience}
    \\cventry{Jun 2016 -- Aug 2016}{Software Engineer Intern}{Mozilla}{Mountain View, CA}{}{
    \\begin{itemize}%
    \\item Broadened search criteria for Firefox’s context menu to include subdomains in password suggestions.
    \\item Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.
    \\end{itemize}}

    \\cventry{Dec 2015 -- May 2016}{Coding Advisor}{Codecademy}{Manhattan, NY}{}{
    \\begin{itemize}%
    \\item Created a JavaScript project for Codecademy Pro members now available in the new JS course.
    \\item Taught new coders how to avoid bugs and how to go through the process of fixing existing ones.
    \\item Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.
    \\end{itemize}}

    \\cventry{Jun 2015 -- Nov 2015}{Application Developer Intern}{IEEE}{Piscataway, NJ}{}{
    \\begin{itemize}%
    \\item Wrote an API that allowed CRUD operations to be used for accessing and manipulating data involving current departments/groups/teams at IEEE.
    \\item Created a UI for admins that used the aforementioned API to automate the process of syncing departments/groups/teams on the site to relevant databases.
    \\item Improved the IEEE Innovate site by using cookies to display tailored web-content.
    \\end{itemize}}

    \\section{Skills}
    \\cvitem{Languages}{Java, JavaScript, Ruby, Python, \\LaTeX, HTML, CSS}
    \\cvitem{Frameworks}{Node.js, Koa, Express, React, Redux, Sinatra}

    \\section{Projects}
    \\cventry{}{LaTeX Resume Generator}{}{\\textit{Node.js, Koa, React, Redux}}{}{A webapp for generating LaTeX resumes from form data (including this one).\\\\https://latexresu.me}

    \\vspace{2mm}

    \\cventry{}{Flow Timer}{}{\\textit{Node.js, Koa, React, Redux}}{}{A modern speedcubing app with a scrambler, timer, and analyzer for cubing statistics.\\\\https://flowtimer.com}

    \\vspace{2mm}

    \\cventry{}{Reddit Image Scraper}{}{\\textit{Ruby, Sinatra}}{}{A web app that lets you view a collage of images/videos from a subreddit.\\\\reddit-image-scraper.herokuapp.com}

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
    ${schools.map((school) => {
      const { name, degree, major, gpa, location, graduationDate } = school

      let degreeLine = ''

      if (degree && major) {
        degreeLine = `${degree} in ${major}`
      } else if (degree || major) {
        degreeLine = degree || major
      }

      return stripIndent`
        \\cventry{${graduationDate || ''}}{${degreeLine}}{${name || ''}}{${gpa ? `GPA: ${gpa}` : ''}}{\\textit{${location || ''}}}{}  
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


    \\documentclass[11pt,a4paper,sans]{moderncv}        % possible options include font size ('10pt', '11pt' and '12pt'), paper size ('a4paper', 'letterpaper', 'a5paper', 'legalpaper', 'executivepaper' and 'landscape') and font family ('sans' and 'roman')

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
