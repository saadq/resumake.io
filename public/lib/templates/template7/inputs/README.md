# moderncv

## A modern curriculum vitae class for LaTeX

**moderncv** provides a documentclass for typesetting curricula vitae in various styles. Moderncv aims to be both straightforward to use and customizable, providing five ready-made styles (classic, casual, banking, oldstyle and fancy) and allowing one to define his own by modifying colors, fonts, icons, etc.

Most commands are defined in such a way that arguments are optional.

Until a decent manual is written, one can always look in the `template.tex` file for an example. It can be compiled to pdf via `latexmk -pdf ./template.tex`.

If using [`academicons`](https://ctan.org/tex-archive/fonts/academicons) in the template, you need to use a Xe(La)TeX or Lua(La)TeX engine for them to render. Otherwise an alternative will be used automatically.

## Development

[![Build template](https://github.com/moderncv/moderncv/actions/workflows/build-pdf.yml/badge.svg)](https://github.com/moderncv/moderncv/actions/workflows/build-pdf.yml)
[![CTAN](https://img.shields.io/ctan/v/moderncv.svg)](https://www.ctan.org/pkg/moderncv)
[![Matrix](https://img.shields.io/matrix/moderncv:matrix.org)](https://matrix.to/#/#moderncv:matrix.org)

As the main goal is to keep this package alive, it is maintained in a loosely structured team. You can contact us in our matrix room [moderncv:matrix.org](https://matrix.to/#/#moderncv:matrix.org), feel free to join if you have questions or want to contribute. Development takes places at [github.com/moderncv/moderncv](https://github.com/moderncv/moderncv).

## Licence

moderncv is licensed under the [LPPL-1.3c](https://spdx.org/licenses/LPPL-1.3c.html).

## Origin

Original author: Xavier Danaux <xdanaux@gmail.com><br/>
Original repository: https://github.com/xdanaux/moderncv<br/>
This repository is a fork aiming to maintain moderncv inside CTAN, since upstream is dead since 2016.
