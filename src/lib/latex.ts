import { PdfTeXEngine, XeTeXEngine, DvipdfmxEngine } from 'swiftlatex'
import { LaTeXOpts } from '../types'

let pdftex
let xetex
let dvipdfmx
let engineLoaded = false

export default async function latex(texDoc: string, opts: LaTeXOpts) {
  if (!engineLoaded) {
    pdftex = new PdfTeXEngine()
    await pdftex.loadEngine()

    xetex = new XeTeXEngine()
    await xetex.loadEngine()

    dvipdfmx = new DvipdfmxEngine()
    await dvipdfmx.loadEngine()

    engineLoaded = true
  }

  switch(opts.cmd) {
    case 'pdflatex': {
      await pdftex.writeMemFSFile("main.tex", texDoc)
      await pdftex.setEngineMainFile("main.tex")
      const { pdf } = await pdftex.compileLaTeX()

      return URL.createObjectURL(new Blob([pdf], {type: 'application/pdf'}))
    }
    case 'xelatex': {
      await xetex.writeMemFSFile("main.tex", texDoc)
      await xetex.setEngineMainFile("main.tex")
      const res = await xetex.compileLaTeX()
      console.log(res)

      await dvipdfmx.writeMemFSFile("main.xdv", res.pdf)
      await dvipdfmx.setEngineMainFile("main.xdv")
      const { pdf } = await dvipdfmx.compilePDF()

      return URL.createObjectURL(new Blob([pdf], {type: 'application/pdf'}))
    }
    case 'lualatex': {
      throw new Error(`${opts.cmd} is not supported yet`)
    }
  }
}
