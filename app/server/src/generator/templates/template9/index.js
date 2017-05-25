const { stripIndent } = require('common-tags')

function template9({ profile, schools, jobs, skills, projects }) {
  return stripIndent`
    % http://www.howtotex.com/general/a-guide-to-building-a-plain-and-simple-latex-cv/
    \\documentclass[a4paper,fontsize=11pt]{article} % KOMA-article class
    % \\documentclass[a4paper,11pt]{article}

    ${generateHeader(profile)}

    \\begin{document}

    ${generateProfileSection(profile)}

    %%% Education
    %%% ------------------------------------------------------------
    \\NewPart{Education}{}

    \\EducationEntry
        {BA Computer Science}
        {Jan 2017}
        {Rutgers University, New Brunswick, NJ}

    %%% Work experience
    %%% ------------------------------------------------------------
    \\NewPart{Work experience}{}

    \\WorkEntry{Software Engineer Intern}{Jun 2016 - Aug 2016}
    {Mozilla, Mountain View, CA}
    {
     \\begin{itemize} \\itemsep -1pt
       \\item Broadened search criteria for Firefox’s context menu to include subdomains in password suggestions.
       \\item Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.
       \\item Fixed regressions for Firefox Electrolysis and improved dialogs and notification popups.
     \\end{itemize}
    }
    \\sepspace

    \\WorkEntry{Coding Advisor}{Dec 2015 - May 2015}
    {Codecademy, Manhattan, NY}
    {
     \\begin{itemize} \\itemsep -1pt
       \\item Created a JavaScript project for Codecademy Pro members now available in the new JS course.
       \\item Taught new coders how to avoid bugs and how to go through the process of fixing existing ones.
       \\item Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.
     \\end{itemize}
    }
    \\sepspace

    \\WorkEntry{Application Developer Intern}{Jun 2015 - Nov 2015}
    {IEEE, Piscataway, NJ}
    {
     \\begin{itemize} \\itemsep -1pt
       \\item Wrote an API that allowed CRUD operations to be used for accessing and manipulating data involving current departments/groups/teams at IEEE.
       \\item Created a UI for admins that used the aforementioned API to automate the process of syncing departments/groups/teams on the site to relevant databases.
       \\item Improved the IEEE Innovate site by using cookies to display tailored web-content.
     \\end{itemize}
    }
    \\sepspace

    \\WorkEntry{Web Developer Intern}{Jan 2015 - Jun 2015}
    {Johnson \\& Johnson, New Brunswick, NJ}
    {
     \\begin{itemize} \\itemsep -1pt
      \\item Improved existing web pages by migrating inline-styling to external CSS files, and adding cross-browser compatibility.
      \\item Created SharePoint front-ends with HTML, CSS, and JavaScript and utilized the jQuery UI library to create responsive widgets.
      \\item Debugged original code base as the sole developer on the team and created a standard for SharePoint web part development for future employees.
     \\end{itemize}
    }

    %%% Skills
    %%% ------------------------------------------------------------
    \\NewPart{Skills}{}

    %% When running low on space, consider using {\\small text goes here} for skills
    \\SkillsEntry{Languages}{JavaScript, Java, Ruby, HTML, CSS, \\LaTeX}
    \\SkillsEntry{Frameworks}{Node.js, Koa, Express, React, Redux}

    %%% Projects
    %%% ------------------------------------------------------------
    \\NewPart{Projects}{}

    \\ProjectEntry{LaTeX Resume Generator}{https://latexresu.me}
    {Node.js, Koa, React, Redux}
    {An easy to use LaTeX Resume Generator webapp.}
    \\sepspace

    \\ProjectEntry{Flow Timer}{https://flowtimer.com}
    {Node.js, Koa, React, Redux}
    {A modern speedcubing app with a scrambler, timer, and analyzer for cubing statistics.}
    \\sepspace

    \\ProjectEntry{Anagrams}{https://saadq.github.io/Anagrams}
    {HTML, CSS, JavaScript}
    {A cognitive, anagram-recognition game where the player must quickly find the answer.}
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
  `
}

module.exports = template9
