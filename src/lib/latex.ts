import { PdfTeXEngine, XeTeXEngine, DvipdfmxEngine } from 'swiftlatex'
import { LaTeXOpts } from '../types'

const pdftex = new PdfTeXEngine()
const xetex = new XeTeXEngine()
const dvipdfmx = new DvipdfmxEngine()
let engineLoaded = false

export default async function latex(texDoc: string, opts: LaTeXOpts) {
  if (!engineLoaded) {
    await Promise.all([
      pdftex.loadEngine(),
      xetex.loadEngine(),
      dvipdfmx.loadEngine()
    ])
    engineLoaded = true

    await pdftex.makeMemFSFolder('fonts/')
    await xetex.makeMemFSFolder('fonts/')
    await dvipdfmx.makeMemFSFolder('fonts/')
  }

  const fonts = await resolveAssets(opts.fonts || [])
  const inputs = await resolveAssets(opts.inputs || [])

  switch (opts.cmd) {
    case 'pdflatex': {
      for (const [name, content] of fonts) {
        await pdftex.writeMemFSFile(`fonts/${name}`, content)
      }

      for (const [name, content] of inputs) {
        await pdftex.writeMemFSFile(name, content)
      }

      await pdftex.writeMemFSFile('main.tex', texDoc)
      await pdftex.setEngineMainFile('main.tex')
      const { pdf } = await pdftex.compileLaTeX()

      return URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }))
    }
    case 'xelatex': {
      for (const engine of [xetex, dvipdfmx]) {
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
