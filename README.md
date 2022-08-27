![resumake-logo](https://i.imgur.com/Y4JmhrV.png)

---

# Important note

Resumake is currently undergoing a major v3 rewrite. For any thing related to the current app, please see [v2-(old)](https://github.com/saadq/resumake.io/tree/v2-(old)).

---

# resumake.io

> A website for automatically generating elegant LaTeX resumes without the need to write any TeX code yourself.

<a href="https://discord.gg/UYygFCF">
  <img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat">
</a>
<a href="https://opencollective.com/resumake/donate">
  <img src="https://img.shields.io/badge/donate-$-ff69b4.svg?maxAge=2592000">
</a>
<a href="#backers">
  <img src="https://opencollective.com/resumake/backers/badge.svg">
</a>
<a href="#sponsors">
  <img src="https://opencollective.com/resumake/sponsors/badge.svg">
</a>

![resumake](https://i.imgur.com/QUoFVmG.png)

Simply choose a template, fill in as much (or as little) info as you want, and then press <kbd>Make</kbd> to see your output. You can change your template at any point to see how your resume looks with different designs.

When you're happy with your result, you can download the resume as a PDF, TeX, or JSON document. The JSON output is compatible with [JSONResume](https://jsonresume.org).

## Credits
Thanks very much to the creators of the LaTeX templates used in this website.

* [Rensselaer Career Development Center](https://www.rpi.edu/dept/arc/training/latex/resumes/)
* [Byungjin Park](https://github.com/posquit0)
* [Scott Clark](https://github.com/sc932)
* [Debarghya Das](https://github.com/deedy)
* [Xavier Danaux](https://github.com/xdanaux)
* [Ratul Saha](https://github.com/RatulSaha)
* [Daniil Belyakov](https://github.com/dnl-blkv)
* [Frits Wenneker](https://www.overleaf.com/latex/templates/your-new-cv/xqzhcmqkqrtw)

## Running resumake.io locally

Make sure you have the following installed:
1. Node v16 or greater
2. LaTeX (TinyTeX Recommended)
```sh
$ curl -sL "https://yihui.org/tinytex/install-bin-unix.sh" | sh
$ tlmgr install preprint enumitem ragged2e fancyhdr xifthen \
  ifmtarg setspace parskip tocloft titlesec textpos babel-english \
  isodate substr xltxtra realscripts hyphenat microtype koma-script \
  moderncv colortbl pgf multirow arydshln tabu changepage sectsty
```

Next, clone the project and run the following inside the root folder:
```
$ npm install
$ npm run dev
```

This will start the app on http://localhost:3000

## License
MIT © Saad Quadri
