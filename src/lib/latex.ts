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

  const fonts = await resolveAssets(opts.fonts || [])
  const inputs = await resolveAssets(opts.inputs || [])

  switch (opts.cmd) {
    case 'pdflatex': {
      await pdftex.makeMemFSFolder('fonts/')
      for (const [name, content] of fonts) {
        await pdftex.writeMemFSFile(`fonts/${name}`, content)
      }

      for (const [name, content] of inputs) {
        await xetex.writeMemFSFile(name, content)
      }

      await pdftex.writeMemFSFile('main.tex', texDoc)
      await pdftex.setEngineMainFile('main.tex')
      const { pdf } = await pdftex.compileLaTeX()

      return URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }))
    }
    case 'xelatex': {
      for (const engine of [xetex, dvipdfmx]) {
        await engine.makeMemFSFolder('fonts/')
        for (const [name, content] of fonts) {
          await engine.writeMemFSFile(`fonts/${name}`, content)
        }
      }

      for (const [name, content] of inputs) {
        await xetex.writeMemFSFile(name, content)
      }

      await xetex.writeMemFSFile('main.tex', texDoc)
      await xetex.setEngineMainFile('main.tex')
      const res = await xetex.compileLaTeX()

      await dvipdfmx.writeMemFSFile('main.xdv', res.pdf)
      await dvipdfmx.setEngineMainFile('main.xdv')
      const { pdf } = await dvipdfmx.compilePDF()

      return URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }))
    }
  }
}

async function resolveAssets(urls: string[]) {
  const assets = await Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buffer) => new Uint8Array(buffer))
    )
  )
  const basenames = urls.map(basename)
  return zip(basenames, assets)
}

function basename(url: string) {
  return url.split('/').pop()
}

function zip<T, U>(a: T[], b: U[]): [T, U][] {
  return a.map((k, i) => [k, b[i]])
}
