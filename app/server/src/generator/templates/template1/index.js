const { stripIndent } = require('common-tags')

function template1({ profile, schools, jobs, projects, skills }) {
  return stripIndent`
    %!TEX TS-program = xelatex
    \\documentclass[]{friggeri-cv}

    \\begin{document}
    ${generateProfileSection(profile)}

    \\section{education}

    \\begin{entrylist}
      \\entry
        {Jan 2017}
        {Rutgers University {\\normalfont BA in Computer Science}}
        {New Brunswick, NJ}
        {\\emph{GPA: 3.4}}
    \\end{entrylist}

    \\section{experience}

    \\begin{entrylist}
      \\entry
        {Jun 2016 – Aug 2016}
        {Mozilla, Software Engineer Intern}
        {Mountain View, CA}
        {\\vspace{-3mm}\\begin{itemize}[leftmargin=10pt,itemsep=4pt]
         \\item Broadened search criteria for Firefox’s context menu to include subdomains in password.
         \\item Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.
         \\item Fixed regressions for Firefox Electrolysis and improved dialogs and notification popups.
         \\end{itemize}}
      \\entry
        {Dec 2015 – May 2016}
        {Codecademy, Coding Advisor}
        {Manhattan, NY}
        {\\vspace{-3mm}\\begin{itemize}[leftmargin=10pt,itemsep=4pt]
         \\item Created a JavaScript project for Codecademy Pro members now available in the new JS course.
         \\item Taught new coders how to avoid bugs and how to go through the process of fixing existing ones.
         \\item Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.
         \\end{itemize}}
      \\entry
        {Jun 2015 – Nov 2015}
        {IEEE, Software Developer Intern}
        {Piscataway, NJ}
        {\\vspace{-3mm}\\begin{itemize}[leftmargin=10pt,itemsep=4pt]
         \\item Wrote an API that allowed CRUD operations to be used for accessing and manipulating data involving current departments/groups/teams at IEEE.
         \\item Created a UI for admins that used the aforementioned API to automate the process of syncing departments/groups/teams on the site to relevant databases.
         \\item Improved the IEEE Innovate site by using cookies to display tailored web-content.
         \\end{itemize}}
    \\end{entrylist}

    \\section{Skills}
    \\begin{entrylist}
    \\skill{}{Languages: {\\normalfont Java, JavaScript, Ruby, Python, HTML, CSS}}
    \\skill{}{Frameworks: {\\normalfont Koa, Express, Sinatra, React, Redux}}
    \\end{entrylist}


    \\section{Projects}
    \\begin{entrylist}
    \\entry
        {}
        {LaTeX Resume Generator {\\normalfont React, Redux, Node.js, Koa}}
        {https://latexresu.me}
        {A webapp for generating LaTeX resumes from form data (including this one).}

    \\entry
        {}
        {Anagrams {\\normalfont HTML, CSS, JavaScript}}
        {https://saadq.github.io/Anagrams}
        {A cognitive, anagram-recognition game where the player must quickly find the answer.}

    \\entry
        {}
        {Flow Timer {\\normalfont React, Redux, Node.js, Koa}}
        {https://github.com/flow-timer}
        {A modern speedcubing app with a scrambler, timer, and analyzer for cubing statistics.}

    \\entry
        {}
        {Reddit Image Scraper {\\normalfont Ruby, Sinatra}}
        {https://reddit-scraper.herokuapp.com}
        {A web app that lets you view a collage of images/videos from a subreddit.}

    \\entry
        {}
        {Materialize {\\normalfont XML, JSON}}
        {https://packagecontrol.io/packages/Materialize}
        {A collection of custom themes for Sublime Text, inspired by Material design with 30k+ installations.}

    \\end{entrylist}

    \\end{document}
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

  if (nameStart && nameEnd) {
    nameStart += ' '
  }

  const info = [email, phoneNumber, address, link].filter(Boolean).join(' | ')

  return stripIndent`
    \\header{${nameStart}}{${nameEnd}}{${info}}
  `
}

module.exports = template1
