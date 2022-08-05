%% start of file `moderncv.cls'.
%% Copyright 2006-2015 Xavier Danaux (xdanaux@gmail.com), 2020-2022 moderncv maintainers (github.com/moderncv).
%
% This work may be distributed and/or modified under the
% conditions of the LaTeX Project Public License version 1.3c,
% available at http://www.latex-project.org/lppl/.


%-------------------------------------------------------------------------------
%                identification
%-------------------------------------------------------------------------------
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{moderncv}[2022-02-21 v2.3.1 modern curriculum vitae and letter document class]


%-------------------------------------------------------------------------------
%                class options
%
% (need to be done before the external package loading, for example because
% we need \paperwidth, \paperheight and \@ptsize to be defined before loading
% geometry and fancyhdr)
%-------------------------------------------------------------------------------
% paper size option
\DeclareOption{a4paper}{
  \setlength\paperheight{297mm}
  \setlength\paperwidth{210mm}}
\DeclareOption{a5paper}{
  \setlength\paperheight{210mm}
  \setlength\paperwidth{148mm}}
\DeclareOption{b5paper}{
  \setlength\paperheight{250mm}
  \setlength\paperwidth{176mm}}
\DeclareOption{letterpaper}{
  \setlength\paperheight{11in}
  \setlength\paperwidth{8.5in}}
\DeclareOption{legalpaper}{
  \setlength\paperheight{14in}
  \setlength\paperwidth{8.5in}}
\DeclareOption{executivepaper}{
  \setlength\paperheight{10.5in}
  \setlength\paperwidth{7.25in}}
\DeclareOption{landscape}{
  \setlength\@tempdima{\paperheight}
  \setlength\paperheight{\paperwidth}
  \setlength\paperwidth{\@tempdima}}

% font size options
\newcommand\@ptsize{}
\DeclareOption{10pt}{\renewcommand\@ptsize{0}}
\DeclareOption{11pt}{\renewcommand\@ptsize{1}}
\DeclareOption{12pt}{\renewcommand\@ptsize{2}}

% font type options
\DeclareOption{sans}{\AtBeginDocument{\renewcommand{\familydefault}{\sfdefault}}}
\DeclareOption{roman}{\AtBeginDocument{\renewcommand{\familydefault}{\rmdefault}}}

% draft/final option
\DeclareOption{draft}{\setlength\overfullrule{5pt}}
\DeclareOption{final}{\setlength\overfullrule{0pt}}

% execute default options
\ExecuteOptions{a4paper,11pt,final}

% process given options
\ProcessOptions\relax
\input{size1\@ptsize.clo}


%-------------------------------------------------------------------------------
%                required packages
%-------------------------------------------------------------------------------
% \AtEndPreamble hook (loading etoolbox instead of defining the macro, as to avoid incompatibilities with etoolbox (and packages relying on it) defining the macro too)
\RequirePackage{etoolbox}
%\let\@endpreamblehook\@empty
%\def\AtEndPreamble{\g@addto@macro\@endpreamblehook}
%\let\document@original\document
%\def\document{\endgroup\@endpreamblehook\begingroup\document@original}

% if... then... else... constructs
\RequirePackage{ifthen}
% TODO: move to xifthen and \isempty{<arg>} instead of \equal{<arg>}{}

% color
\RequirePackage[table]{xcolor}

% tex compiler checking for symbol loading
\RequirePackage{iftex}
\newif\ifxetexorluatex
\ifxetex
  \xetexorluatextrue
\else
  \ifluatex
    \xetexorluatextrue
  \else
    \xetexorluatexfalse
  \fi
\fi


% hyper links (hyperref is loaded at the end of the preamble to pass options required by loaded packages such as CJK)
\newcommand*\pdfpagemode{UseNone}% do not show thumbnails or bookmarks on opening (on supporting browsers); set \pdfpagemode to "UseOutlines" to show bookmarks
\RequirePackage{url}
\urlstyle{tt}
\AtEndPreamble{
  \pagenumbering{arabic}% has to be issued before loading hyperref, as to set \thepage and hence to avoid hyperref issuing a warning and setting pdfpagelabels=false
  \RequirePackage[unicode]{hyperref}% unicode is required for unicode pdf metadata
  \hypersetup{
    breaklinks,
    pdfborder     = 0 0 0,
    pdfpagemode   = \pdfpagemode,
    pdfstartpage  = 1,
    pdfcreator    = {\LaTeX{} with 'moderncv' package},
%    pdfproducer   = {\LaTeX{}},% will/should be set automatically to the correct TeX engine used
    bookmarksopen = true,
    bookmarksdepth= 2,% to show sections and subsections
    pdfauthor     = {\@firstname{}~\@lastname{}},
    pdftitle      = {\@firstname{}~\@lastname{}\notblank{\@title}{ -- \@title}{}},
    pdfsubject    = {R\'{e}sum\'{e} of \@firstname{}~\@lastname{}},
    pdfkeywords   = {\@firstname{}~\@lastname{}, curriculum vit\ae{}, r\'{e}sum\'{e}}}}

% graphics
\RequirePackage{graphicx}

% headers and footers
\RequirePackage{fancyhdr}
\fancypagestyle{plain}{
  \renewcommand{\headrulewidth}{0pt}
  \renewcommand{\footrulewidth}{0pt}
  \fancyhf{}}
% page numbers in footer if more than 1 page
\newif\if@displaypagenumbers\@displaypagenumberstrue
\newcommand*{\nopagenumbers}{\@displaypagenumbersfalse}
\AtEndPreamble{%
  \AtBeginDocument{%
    % fancyhdr length
    \renewcommand{\headwidth}{\textwidth}
    \if@displaypagenumbers%
      \@ifundefined{r@lastpage}{}{%
        \ifthenelse{\pageref{lastpage}>1}{%
          \newlength{\pagenumberwidth}%
          \settowidth{\pagenumberwidth}{\color{color2}\addressfont\itshape\strut\thepage/\pageref{lastpage}}%
          \fancypagestyle{plain}{%
            \fancyfoot[r]{\parbox[b]{\pagenumberwidth}{\color{color2}\pagenumberfont\strut\thepage/\pageref{lastpage}}}}% the parbox is required to ensure alignment with a possible center footer (e.g., as in the casual style)
          \pagestyle{plain}}{}}\fi}%
  \AtEndDocument{\label{lastpage}}}
\pagestyle{plain}

% reduced list spacing
% package providing hooks into lists
%   originally developped by Jakob Schiotz (see http://dcwww.camd.dtu.dk/~schiotz/comp/LatexTips/tweaklist.sty)
%   modified and distributed with moderncv(not available otherwise on ctan)
\RequirePackage{tweaklist}
\renewcommand*{\itemhook}{%
  \@minipagetrue% removes spacing before lists as they use \addvspace, which doesn't add vertical space inside minipages
  \@noparlisttrue% removes spacing at end of lists, caused by \par
  \setlength{\topsep}{0pt}% normally not required thanks to \@minipagetrue
  \setlength{\partopsep}{0pt}% normally not required thanks to \@minipagetrue
  \setlength{\parsep}{0pt}% not required when \itemsep and \parskip are set to 0pt (?)
  \setlength{\parskip}{0pt}%
  \setlength{\itemsep}{0pt}}
\renewcommand*{\enumhook}{\itemhook{}}
\renewcommand*{\deschook}{\itemhook{}}

% lengths calculations
\RequirePackage{calc}

% advanced command arguments (LaTeX 3)
\RequirePackage{xparse}
% TODO (?): replace all \newcommand by \NewDocumentCommand

% micro-typography (e.g., character protrusion, font expansion, hyphenatable letterspacing)
\RequirePackage{microtype}

% stack of key-value elements, used to save personal information
\RequirePackage{moderncvcollection}

% compatibility package with older versions of moderncv
\RequirePackageWithOptions{moderncvcompatibility}

\RequirePackage{expl3}

%-------------------------------------------------------------------------------
%                class definition
%-------------------------------------------------------------------------------
% minimal base settings
\setlength\lineskip{1\p@}
\setlength\normallineskip{1\p@}
\renewcommand\baselinestretch{}
\setlength{\parindent}{0\p@}
\setlength{\parskip}{0\p@}
\setlength\columnsep{10\p@}
\setlength\columnseprule{0\p@}
\setlength\fboxsep{3\p@}
\setlength\fboxrule{.4\p@}
\setlength\arrayrulewidth{.4\p@}
\setlength\doublerulesep{2\p@}

% not set on purpose
%\setlength\arraycolsep{5\p@}
%\setlength\tabcolsep{6\p@}
%\setlength\tabbingsep{\labelsep}

\raggedbottom
\onecolumn


%-------------------------------------------------------------------------------
%                overall design commands definitions
%-------------------------------------------------------------------------------
% elements
%---------
% defines one's name
% usage: \name{<firstname>}{<lastname>}
\newcommand*{\name}[2]{\def\@firstname{#1}\def\@lastname{#2}}

% defines one's title (optional)
% usage: \title{<title>}
\renewcommand*{\title}[1]{\def\@title{#1}}

% defines one's address (optional)
% usage: \address{<street>}{<city>}{<country>}
% where the <city> and <country> arguments can be omitted or provided empty
\NewDocumentCommand{\address}{mG{}G{}}{\def\@addressstreet{#1}\def\@addresscity{#2}\def\@addresscountry{#3}}

% defines one's birthday (optional)
% usage: \born{date, place}
\newcommand*{\born}[1]{\def\@born{#1}}

% defines one's email (optional)
% usage: \email{<email adress>}
\newcommand*{\email}[1]{\def\@email{#1}}

% defines one's home page (optional)
% usage: \homepage{<url>}
\newcommand*{\homepage}[1]{\def\@homepage{#1}}

% adds a fixed/mobile/fax number to one's personal information (optional)
% usage: \phone[<optional type>]{<number>}
% where <optional type> should be either "fixed" (default), "mobile" or "fax
\collectionnew{phones}
\NewDocumentCommand{\phone}{O{fixed}m}{%
  \ifthenelse{\equal{#1}{fax}}%
    {\collectionadd[#1]{phones}{#2}}
    {\collectionadd[#1]{phones}{\protect\tellink{#2}}}
    }


% http://latex.org/forum/viewtopic.php?t=12239
\def\SplitMyMacro#1/#2{#2}
    
    
% adds a social link to one's personal information (optional)
% usage: \social[<optional type>][<optional url>]{<account name>}
% where <optional type> should be either "linkedin", "xing", "twitter", "github", "gitlab", "bitbucket" or "skype"
\collectionnew{socials}
\NewDocumentCommand{\social}{O{}O{}m}{%
  \ifthenelse{\equal{#2}{}}%
    {%
      \ifthenelse{\equal{#1}{linkedin}}     {\collectionadd[linkedin]{socials}     {\protect\httpslink[#3]{www.linkedin.com/in/#3}}}               {}%
      \ifthenelse{\equal{#1}{xing}}         {\collectionadd[xing]{socials}         {\protect\httpslink[#3]{www.xing.com/profile/#3}}}              {}%
      \ifthenelse{\equal{#1}{twitter}}      {\collectionadd[twitter]{socials}      {\protect\httpslink[#3]{twitter.com/#3}}}                       {}%
      \ifthenelse{\equal{#1}{github}}       {\collectionadd[github]{socials}       {\protect\httpslink[#3]{github.com/#3}}}                        {}%
      \ifthenelse{\equal{#1}{gitlab}}       {\collectionadd[gitlab]{socials}       {\protect\httpslink[#3]{gitlab.com/#3}}}                        {}%
      \ifthenelse{\equal{#1}{stackoverflow}}{\collectionadd[stackoverflow]{socials}{\protect\httpslink[#3]{stackoverflow.com/users/#3}}}           {}%
      \ifthenelse{\equal{#1}{bitbucket}}    {\collectionadd[bitbucket]{socials}    {\protect\httpslink[#3]{bitbucket.org/#3}}}                     {}%
      \ifthenelse{\equal{#1}{skype}}        {\collectionadd[skype]{socials}        {#3}}                                                           {}%
      \ifthenelse{\equal{#1}{orcid}}        {\collectionadd[orcid]{socials}        {\protect\httpslink[#3]{orcid.org/#3}}}                         {}%
      \ifthenelse{\equal{#1}{researchgate}} {\collectionadd[researchgate]{socials} {\protect\httpslink[#3]{www.researchgate.net/profile/#3}}}      {}%
      \ifthenelse{\equal{#1}{researcherid}} {\collectionadd[researcherid]{socials} {\protect\httpslink[#3]{www.researcherid.com/rid/#3}}}          {}%
      \ifthenelse{\equal{#1}{telegram}}     {\collectionadd[telegram]{socials}     {\protect\httpslink[#3]{t.me/#3}}}                              {}%
      \ifthenelse{\equal{#1}{whatsapp}}     {\collectionadd[whatsapp]{socials}     {\protect\httpslink[#3]{wa.me/#3}}}                             {}%
      \ifthenelse{\equal{#1}{signal}}       {\collectionadd[signal]{socials}       {#3}}                                                           {}%
      \ifthenelse{\equal{#1}{matrix}}       {\collectionadd[matrix]{socials}       {\httpslink[#3]{matrix.to/\#/#3}}}                              {}%
      \ifthenelse{\equal{#1}{googlescholar}}{\collectionadd[googlescholar]{socials}{\protect\httpslink[#3]{scholar.google.com/citations?user=#3}}} {}%                        {}%
      }
    {\collectionadd[#1]{socials}{\protect\httpslink[#3]{#2}}}}%

% defines additional personal information (optional)
% usage: \extrainfo{<text>}
\newcommand*{\extrainfo}[1]{\def\@extrainfo{#1}}

% colors
%-------
\definecolor{color0}{rgb}{0,0,0}% main default color, normally left to black
\definecolor{color1}{rgb}{0,0,0}% primary scheme color
\definecolor{color2}{rgb}{0,0,0}% secondary scheme color
\definecolor{color3}{rgb}{0,0,0}% tertiary scheme color

% symbols
%--------
% itemize labels (the struts were added to correct inter-item spacing (works for single line items, until a solution is found for multi-line ones...)
\newcommand*{\labelitemi}          {\strut\textcolor{color1}{\large\rmfamily\textbullet}}% the \rmfamily is required to force Latin Modern fonts when using sans serif, as OMS/lmss/m/n is not defined and gets substituted by OMS/cmsy/m/n
\newcommand*{\labelitemii}         {\strut\textcolor{color1}{\large\bfseries-}}
\newcommand*{\labelitemiii}        {\strut\textcolor{color1}{\rmfamily\textperiodcentered}}% alternative: \textasteriskcentered; the \rmfamily is required to force Latin Modern fonts when using sans serif, as OMS/lmss/m/n is not defined and gets substituted by OMS/cmsy/m/n
\newcommand*{\labelitemiv}         {\labelitemiii}

% enumerate labels
\renewcommand{\theenumi}           {\@arabic\c@enumi}
\renewcommand{\theenumii}          {\@alph\c@enumii}
\renewcommand{\theenumiii}         {\@roman\c@enumiii}
\renewcommand{\theenumiv}          {\@Alph\c@enumiv}

% other symbols
\newcommand*{\listitemsymbol}           {\labelitemi~}
\newcommand*{\addresssymbol}            {}
\newcommand*{\bornsymbol}               {}
\newcommand*{\mobilephonesymbol}        {}
\newcommand*{\fixedphonesymbol}         {}
\newcommand*{\faxphonesymbol}           {}
\newcommand*{\emailsymbol}              {}
\newcommand*{\homepagesymbol}           {}
\newcommand*{\linkedinsocialsymbol}     {}
\newcommand*{\xingsocialsymbol}         {}
\newcommand*{\twittersocialsymbol}      {}
\newcommand*{\githubsocialsymbol}       {}
\newcommand*{\gitlabsocialsymbol}       {}
\newcommand*{\stackoverflowsocialsymbol}{}
\newcommand*{\bitbucketsocialsymbol}    {}
\newcommand*{\skypesocialsymbol}        {}
\newcommand*{\orcidsocialsymbol}        {}
\newcommand*{\researchgatesocialsymbol} {}
\newcommand*{\researcheridsocialsymbol} {}
\newcommand*{\googlescholarsocialsymbol}{}
\newcommand*{\telegramsocialsymbol}     {}
\newcommand*{\whatsappsocialsymbol}     {}
\newcommand*{\matrixsocialsymbol}       {}
\newcommand*{\signalsocialsymbol}       {}

% other
%------
% fonts
\AtBeginDocument{\normalfont\color{color0}}

% strings for internationalisation
\newcommand*{\refname}{Publications}
\newcommand*{\enclname}{Enclosure}

% makes the footer (normally used both for the resume and the letter)
% usage: \makefooter
\newcommand*{\makefooter}{}%

\newcommand*{\@loadmoderncvpackage}[3][]{%
  \begingroup\edef\x{\endgroup%
    \noexpand\RequirePackage[#1]{moderncv#2\ifcase#3\or i\or ii\or iii\or iv\or v\or vi\or vii\or viii\or ix\or x\fi}%
  }\x}

% loads a style variant (a combination of header, body and footer)
% usage: \moderncvstyle{<style variant name>}
\newcommand*{\moderncvstyle}[2][]{%
  \RequirePackage[#1]{moderncvstyle#2}}

% loads a header variant
% usage: \moderncvhead[<optional head option>]{<header variant number>}
\newcommand*{\moderncvhead}[2][]{%
  \@loadmoderncvpackage[#1]{head}{#2}}

% loads a body variant
% usage: \moderncvbody[<optional body option>]{<body variant number>}
\newcommand*{\moderncvbody}[2][]{%
  \@loadmoderncvpackage[#1]{body}{#2}}

% loads a footer variant
% usage: \moderncvfoot[<optional foot option>]{<foot variant number>}
\newcommand*{\moderncvfoot}[2][]{%
  \@loadmoderncvpackage[#1]{foot}{#2}}

% loads a color scheme
% usage: \moderncvcolor{<color scheme name>}
\newcommand*{\moderncvcolor}[1]{%
  \RequirePackage{moderncvcolor#1}}

% loads an icons set
% usage: \moderncvicons{<icon set name>}
\newcommand*{\moderncvicons}[1]{%
  \RequirePackage{moderncvicons#1}}

% recomputes all automatic lengths
\newcommand*{\recomputeheadlengths}{\recomputecvheadlengths}
\newcommand*{\recomputebodylengths}{\recomputecvbodylengths}
\newcommand*{\recomputefootlengths}{\recomputecvfootlengths}
\newcommand*{\recomputelengths}{\recomputecvlengths}
\AtBeginDocument{\recomputelengths{}}

% creates a command if not yet defined
\newcommand*{\@initializecommand}[2]{%
  \ifdefined#1
    \renewcommand{#1}{#2}%
  \else%
    \newcommand*{#1}{#2}\fi}

% creates a length if not yet defined
\newcommand*{\@initializelength}[1]{%
  \ifdefined#1
  \else%
    \newlength{#1}\fi%
  \setlength{#1}{0pt}}

% creates a box if not yet defined
\newcommand*{\@initializebox}[1]{%
  \ifdefined#1
    \savebox{#1}{}%
  \else%
    \newsavebox{#1}\fi}

% creates an if switch if not yet defined
\newcommand*{\@initializeif}[1]{%
%  \ifdefined#1% not working due to the nested \if
%  \else%
    \newif#1%\fi
  }

% custom strut for spacing; the first argument is the vertical offset of the strut, the second its total height
\newcommand*{\@moderncvstrut}[2]{%
  \rule[-#1]{0pt}{#2}}


%-------------------------------------------------------------------------------
%                resume design commands definitions
%-------------------------------------------------------------------------------
% elements
% defines one's picture (optional)
% usage: photo[<picture width>][<picture frame thickness>]{<picture filename>}
\NewDocumentCommand{\photo}{O{64pt}O{0.4pt}m}{\def\@photowidth{#1}\def\@photoframewidth{#2}\def\@photo{#3}}
\newcommand*{\quote}[1]{\def\@quote{#1}}

% fonts
\newcommand*{\namefont}{}
\newcommand*{\titlefont}{}
\newcommand*{\addressfont}{}
\newcommand*{\quotefont}{}
\newcommand*{\sectionfont}{}
\newcommand*{\subsectionfont}{}
\newcommand*{\hintfont}{}
\newcommand*{\pagenumberfont}{\addressfont\itshape}
% fake small caps - cfr http://tex.stackexchange.com/questions/55664/fake-small-caps-with-xetex-fontspec
%\def\fakesc{\bgroup\obeyspaces\fakescaux}
%\def\fakescaux#1{\fakescauxii #1\relax\relax\egroup}
%\def\fakescauxii#1{%
%\ifx\relax#1\else \ifcat#1\@sptoken{} \expandafter\expandafter\expandafter\fakescauxii\else
%\ifnum`#1=\uccode`#1 {\normalsize #1}\else {\footnotesize \uppercase{#1}}\fi \expandafter\expandafter\expandafter\fakescauxii\expandafter\fi\fi}

% styles
\newcommand*{\namestyle}[1]{{\namefont#1}}
\newcommand*{\titlestyle}[1]{{\titlefont#1}}
\newcommand*{\addressstyle}[1]{{\addressfont#1}}
\newcommand*{\quotestyle}[1]{{\quotefont#1}}
\newcommand*{\sectionstyle}[1]{{\sectionfont#1}}
\newcommand*{\subsectionstyle}[1]{{\subsectionfont#1}}
\newcommand*{\hintstyle}[1]{{\hintfont#1}}
\newcommand*{\pagenumberstyle}[1]{{\pagenumberfont#1}}

% recompute all resume lengths
\newcommand*{\recomputecvheadlengths}{}
\newcommand*{\recomputecvbodylengths}{}
\newcommand*{\recomputecvfootlengths}{}
\newcommand*{\recomputecvlengths}{%
  \recomputecvheadlengths%
  \recomputecvbodylengths%
  \recomputecvfootlengths}

% internal maketitle command to issue a new line only when required
\newif\if@firstdetailselement\@firstdetailselementtrue
\newcommand*{\makenewline}[1][0pt]{%
  \if@firstdetailselement%
    \strut% to ensure baseline alignment, e.g. with when put in the margin vs sections that also contains a \strut
  \else%
    \\[#1]\fi%
  \@firstdetailselementfalse}

% makes the resume title
% usage: \makecvtitle
\newcommand*{\makecvtitle}{%
  \makecvhead%
  \makecvfoot}
\newcommand*{\makecvhead}{}
\newcommand*{\makecvfoot}{}

% makes a resume section
% usage: \section{<title>}
% identical starred and non-starred variants should be defined for compatibility with other packages (e.g. with natbib, that uses \section*{} for the bibliography header)
\NewDocumentCommand{\section}{sm}{}

% makes a resume subsection
% usage: \subsection{title}
\NewDocumentCommand{\subsection}{sm}{}

% makes a resume line with a header and a corresponding text
% usage: \cvitem[spacing]{header}{text}
\newcommand*{\cvitem}[3][.25em]{}

% makes a resume line 2 headers and their corresponding text
% usage: \cvdoubleitem[spacing]{header1}{text1}{header2}{text2}
\newcommand*{\cvdoubleitem}[5][.25em]{}

% makes a resume line with a list item
% usage: \cvlistitem[label]{item}
\newcommand*{\cvlistitem}[2][\listitemsymbol]{}

% makes a resume line with 2 list items
% usage: \cvlistdoubleitem[label]{item1}{item2}
\newcommand*{\cvlistdoubleitem}[3][\listitemsymbol]{}

% makes a typical resume job / education entry
% usage: \cventry[spacing]{years}{degree/job title}{institution/employer}{localization}{optionnal: grade/...}{optional: comment/job description}
\newcommand*{\cventry}[7][.25em]{}

% makes a resume entry with a proficiency comment
% usage: \cvitemwithcomment[spacing]{header}{text}{comment}
\newcommand*{\cvitemwithcomment}[4][.25em]{}

% makes a generic hyperlink
% usage: \link[optional text]{link}
\newcommand*{\link}[2][]{%
  \ifthenelse{\equal{#1}{}}%
    {\href{#2}{#2}}%
    {\href{#2}{#1}}}

% makes a http hyperlink
% usage: \httplink[optional text]{link}
\newcommand*{\httplink}[2][]{%
  \ifthenelse{\equal{#1}{}}%
    {\href{http://#2}{#2}}%
    {\href{http://#2}{#1}}}


% makes an https hyperlink
% usage: \httpslink[optional text]{link}
\newcommand*{\httpslink}[2][]{%
  \ifthenelse{\equal{#1}{}}%
    {\href{https://#2}{#2}}%
    {\href{https://#2}{#1}}}

% makes an email hyperlink
% usage: \emaillink[optional text]{link}
\newcommand*{\emaillink}[2][]{%
  \ifthenelse{\equal{#1}{}}%
    {\href{mailto:#2}{#2}}%
    {\href{mailto:#2}{#1}}}

% makes a tel hyperlink
% usage: \tellink[optional text]{link}
\newcommand*{\tellink}[2][]{%
  \ifthenelse{\equal{#1}{}}%
    {\expandafter\onlynumberslink\expandafter{#2}{#2}}%
    {\expandafter\onlynumberslink\expandafter{#2}{#1}}}

\ExplSyntaxOn
\tl_new:N \l_onlynumberslink_tl
\cs_new:Npn \onlynumberslink #1 #2  {
    \tl_set:Nn \l_onlynumberslink_tl {#1}
    \regex_replace_all:nnN {[^0-9+]} {} \l_onlynumberslink_tl
    \href{ tel\token_to_str:N : \tl_use:N \l_onlynumberslink_tl}{ #2 }
}
\ExplSyntaxOff

% cvcolumns environment, where every column is created through \cvcolumn
% usage: \begin{cvcolumns}
%          \cvcolumn[width]{head}{content}
%          \cvcolumn[width]{head}{content}
%          ...
%        \end{cvcolumns}
% where "width" is the width as a fraction of the line length (between 0 and 1), "head" is the column header and "content" its content
\newcounter{cvcolumnscounter}% counter for the number of columns
\newcounter{cvcolumnsautowidthcounter}% counter for the number of columns with no column width provided, and which will then be equally distributed
\newcounter{tmpiteratorcounter}% counter for any temporary purpose (e.g., iterating loops)
\newlength{\cvcolumnsdummywidth}\setlength{\cvcolumnsdummywidth}{1000pt}% dummy width for total width, in order to enable arithmetics (TeX has no float variables, only integer counters or lengths)
\newlength{\cvcolumnswidth}% total width available for head / content
\newlength{\cvcolumnsautowidth}% total width of columns with no explicit width provided
\newlength{\cvcolumnautowidth}% width of one of the columns with no explicit width provided (based on equal distribution of remaining space)
\newif\if@cvcolumns@head@empty% whether or not at least one of the columns has a header
\newenvironment*{cvcolumns}%
  {% at environment opening: reset counters, lengths and ifs
    \setcounter{cvcolumnscounter}{0}%
    \setcounter{cvcolumnsautowidthcounter}{0}%
    \setlength{\cvcolumnsautowidth}{\cvcolumnsdummywidth}%
    \setlength{\cvcolumnautowidth}{0pt}%
    \@cvcolumns@head@emptytrue\ignorespaces}%
  {% at environment closing: typeset environment
    % compute the width of each cvcolumn, considering a spacing of \separatorcolumnwidth and the columns with set width
    \ifnum\thecvcolumnscounter>0%
      \setlength{\cvcolumnswidth}{\maincolumnwidth-\value{cvcolumnscounter}\separatorcolumnwidth+\separatorcolumnwidth}%
      \setlength{\cvcolumnautowidth}{\cvcolumnswidth*\ratio{\cvcolumnsautowidth}{\cvcolumnsdummywidth}/\value{cvcolumnsautowidthcounter}}\fi%
    % pre-aggregate the tabular definition, heading and content (required before creating the tabular, as the tabular environment doesn't like loops --- probably because "&" generates a \endgroup)
    % - the tabular definition is the aggregation of the different "\cvcolumn<i>@def" (by default "p{\cvcolumnautowidth}"), separated by "@{\hspace*{\separatorcolumnwidth}}"
    % - the tabular heading is the aggregation of the different "\cvcolumn<i>@head", separated by "&"
    % - the tabular content is the aggregation of the different "\cvcolumn<i>@content", separated by "&"
    % to aggregate the different elements, \protected@edef or \g@addto@macro is required to avoid that \cvcolumns@def, -@head and -@content get expanded in subsequent redefinitions, which would cause errors due to the expansions of \hspace, of \subsectionstyle and possibly of user content/argument such as font commands
    \def\cvcolumns@def{}%
    \def\cvcolumns@head{}%
    \def\cvcolumns@content{}%
    \setcounter{tmpiteratorcounter}{0}%
    % loop based on \g@addto@macro
    \loop\ifnum\thetmpiteratorcounter<\thecvcolumnscounter%
      \ifnum\thetmpiteratorcounter=0\else%
        \g@addto@macro\cvcolumns@def{@{\hspace*{\separatorcolumnwidth}}}%
        \g@addto@macro\cvcolumns@head{&}%
        \g@addto@macro\cvcolumns@content{&}\fi%
%      \expandafter\g@addto@macro\expandafter\cvcolumns@def\expandafter{\csname cvcolumn\roman{tmpiteratorcounter}@def\endcsname}%      % this creates issues with the colortbl" package (loaded by xcolor when passing the "table" option) as the column definitions passed to \begin{tabular} contains \cvcolumn<i>@def references that it doesn't understand; the next 2 lines expand \cvcolumn@def to the point it doesn't
      \edef\tmpcvcolumn@def{\csname cvcolumn\roman{tmpiteratorcounter}@def\endcsname}%
      \expandafter\g@addto@macro\expandafter\cvcolumns@def\expandafter{\tmpcvcolumn@def}%
      \expandafter\g@addto@macro\expandafter\cvcolumns@head\expandafter{\csname cvcolumn\roman{tmpiteratorcounter}@head\endcsname}%
      \expandafter\g@addto@macro\expandafter\cvcolumns@content\expandafter{\csname cvcolumn\roman{tmpiteratorcounter}@content\endcsname}%
      \stepcounter{tmpiteratorcounter}%
      \repeat%
%    % same loop based on \protected@edef
%    \loop\ifnum\thetmpiteratorcounter<\thecvcolumnscounter%
%      \ifnum\thetmpiteratorcounter=0\else%
%        \protected@edef\cvcolumns@def{\cvcolumns@def @{\hspace*{\separatorcolumnwidth}}}%
%        \protected@edef\cvcolumns@head{\cvcolumns@head &}%
%        \protected@edef\cvcolumns@content{\cvcolumns@content &}\fi%
%      \expandafter\protected@edef\expandafter\cvcolumns@def\expandafter{\expandafter\cvcolumns@def\expandafter\protect\csname cvcolumn\roman{tmpiteratorcounter}@def\endcsname}%
%      \expandafter\protected@edef\expandafter\cvcolumns@head\expandafter{\expandafter\cvcolumns@head\expandafter\protect\csname cvcolumn\roman{tmpiteratorcounter}@head\endcsname}%
%      \expandafter\protected@edef\expandafter\cvcolumns@content\expandafter{\expandafter\cvcolumns@content\expandafter\protect\csname cvcolumn\roman{tmpiteratorcounter}@content\endcsname}%
%      \stepcounter{tmpiteratorcounter}%
%      \repeat%
    % create the tabular
    \cvitem{}{%
%      \begin{tabular}{\cvcolumns@def}% this conflicts with the "colortbl" package (loaded by xcolor when passing the "table" option), and requires the below 2 lines to expand \cvcolumns@def
      \def\begincvcolumns{\begin{tabular}[t]}% "[t]" is required for some body styles; the default alignment is "[c]"
      \expandafter\begincvcolumns\expandafter{\cvcolumns@def}%
        \if@cvcolumns@head@empty\else%
          \cvcolumns@head%\\[-.8em]%
%          {\color{color1}\rule{\maincolumnwidth}{.25pt}}%
          \\\fi%
        \cvcolumns@content%
      \end{tabular}}}

% cvcolumn command, to create a column inside a cvcolumns environment
% usage: \cvcolumn[width]{head}{content}
% where "width" is the width as a fraction of the line length (between 0 and 1), "head" is the column header and "content" its content ("head" and "content" can contain "\\", "\newline" or any other paragraph command such as "itemize")
\newcommand*{\cvcolumn}[3][\cvcolumnautowidth]{%
%  \def\cvcolumn@width{}%
  \ifthenelse{\equal{#1}{\cvcolumnautowidth}}%
    {% if no width fraction is provided, count this column as auto-adjusted and set its width to \cvcolumnsautowidth
      \stepcounter{cvcolumnsautowidthcounter}%
      \expandafter\expandafter\expandafter\def\expandafter\csname cvcolumn\roman{cvcolumnscounter}@def\endcsname{p{\cvcolumnautowidth}}%
      \expandafter\expandafter\expandafter\def\expandafter\csname cvcolumn\roman{cvcolumnscounter}@head\endcsname{\protect\parbox[b]{\cvcolumnautowidth}{\protect\subsectionstyle{#2}}}}%
    {% if a width is provided, set the width of the column to it and decrease the available space for auto-adjusted columns
      \addtolength{\cvcolumnsautowidth}{-#1\cvcolumnsdummywidth}%
      \expandafter\expandafter\expandafter\def\expandafter\csname cvcolumn\roman{cvcolumnscounter}@def\endcsname{p{#1\cvcolumnswidth}}%
      \expandafter\expandafter\expandafter\def\expandafter\csname cvcolumn\roman{cvcolumnscounter}@head\endcsname{\protect\parbox[b]{#1\cvcolumnswidth}{\protect\subsectionstyle{#2}}}}%
  \ifthenelse{\equal{#2}{}}{}{\@cvcolumns@head@emptyfalse}%
  \expandafter\expandafter\expandafter\def\expandafter\csname cvcolumn\roman{cvcolumnscounter}@content\endcsname{\protect\cvcolumncell{#3}}%
  \stepcounter{cvcolumnscounter}%
  \ignorespaces}

% internal cvcolumncell command, that enables a cvcolumn cell to contain paragraph commands (lists, newlines, etc)
\newcommand*{\cvcolumncell}[1]{{% put cell inside a group, so that command redefinitions are only local
  % roughly restore \\ to its regular definition (outside of tabular)
  \renewcommand*{\\}{\newline}%
  % enclose the contents of the cell inside a vertical box, to allow paragraph commands
  \protect\vtop{#1}}}

% thebibliography environment, for use with BibTeX and possibly multibib
\newlength{\bibindent}
\setlength{\bibindent}{1.5em}
% bibliography item label
\newcommand*{\bibliographyitemlabel}{}% use \@biblabel{\arabic{enumiv}} for BibTeX labels
%\newif\if@multibibfirstbib\@multibibfirstbibfalse
% bibliography head (section, etc}, depending on whether multibib is used
\newcommand*{\bibliographyhead}[1]{\section{#1}}
\AtEndPreamble{\@ifpackageloaded{multibib}{\renewcommand*{\bibliographyhead}[1]{\subsection{#1}}}{}}
% thebibliography environment definition
\newenvironment{thebibliography}[1]{}{}
\newcommand*{\newblock}{\hskip .11em\@plus.33em\@minus.07em}
\let\@openbib@code\@empty
%% fix a bug (hardcoded bib label) in \@bibitem
%\renewcommand\@bibitem[1]{%
%  \item\if@filesw \immediate\write\@auxout
%    {\string\bibcite{#1}{\theenumiv}}\fi\ignorespaces}% replaced "\the\value{\@listctr}" with "\theenumiv"

% itemize, enumerate and description environment
\setlength{\leftmargini}   {1em}
\leftmargin\leftmargini
\setlength{\leftmarginii}  {\leftmargini}
\setlength{\leftmarginiii} {\leftmargini}
\setlength{\leftmarginiv}  {\leftmargini}
\setlength{\leftmarginv}   {\leftmargini}
\setlength{\leftmarginvi}  {\leftmargini}
\setlength{\labelsep}      {.5em}% this is the distance between the label and the body, but it pushes the label to the left rather than pushing the body to the right (to do the latter, modify \leftmargin(i)
\setlength{\labelwidth}    {\leftmargini}% unfortunately, \labelwidth is not defined by item level (i.e. no \labeliwidth, \labeliiwidth, etc)
\addtolength{\labelwidth}  {-\labelsep}
\@beginparpenalty -\@lowpenalty
\@endparpenalty   -\@lowpenalty
\@itempenalty     -\@lowpenalty
\newcommand\labelenumi{\theenumi.}
\newcommand\labelenumii{(\theenumii)}
\newcommand\labelenumiii{\theenumiii.}
\newcommand\labelenumiv{\theenumiv.}
\renewcommand\p@enumii{\theenumi}
\renewcommand\p@enumiii{\p@enumii(\theenumii)}
\renewcommand\p@enumiv{\p@enumiii\theenumiii}
% description label
\newcommand*\descriptionlabel[1]{\hspace\labelsep\normalfont\bfseries#1}

% classical \today definition
\def\today{\ifcase\month\or
  January\or February\or March\or April\or May\or June\or
  July\or August\or September\or October\or November\or December\fi
  \space\number\day, \number\year}

%\newcommand{\widthofautobox}[1]{%
%  \widthof{\begin{tabular}{@{}l@{}}#1\end{tabular}}}

%\newcommand{\autobox}[2][b]{%
%  \parbox[#1]{\widthofautobox{#2}}{#2}}


%-------------------------------------------------------------------------------
%                letter design commands definitions
%-------------------------------------------------------------------------------
% elements
\newcommand*{\recipient}[2]{\def\@recipientname{#1}\def\@recipientaddress{#2}}
\renewcommand*{\date}[1]{\def\@date{#1}}\date{\today}
\newcommand*{\opening}[1]{\def\@opening{#1}}
\newcommand*{\closing}[1]{\def\@closing{#1}}
\newcommand*{\enclosure}[2][]{%
  % if an optional argument is provided, use it to redefine \enclname
  \ifthenelse{\equal{#1}{}}{}{\renewcommand*{\enclname}{#1}}%
  \def\@enclosure{#2}}

% recompute all letter lengths
\newcommand*{\recomputeletterheadlengths}{}
\newcommand*{\recomputeletterbodylengths}{}
\newcommand*{\recomputeletterfootlengths}{}
\newcommand*{\recomputeletterlengths}{%
  \recomputeletterheadlengths%
  \recomputeletterbodylengths%
  \recomputeletterfootlengths}

% makes the letter title
% usage: \makelettertitle
\newcommand*{\makelettertitle}{%
  \makeletterhead%
  \makeletterfoot}
\newcommand*{\makeletterhead}{}
\newcommand*{\makeletterfoot}{}

% makes the letter closing
% usage: \makeletterclosing
\newcommand*{\makeletterclosing}{}


\endinput


%% end of file `moderncv.cls'.
