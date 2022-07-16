/* eslint-disable no-console */

import { spawn } from 'node:child_process'
import { mkdtemp } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import nodeLatex from 'node-latex'
import { LaTeXOpts } from '../types'
import { copy } from 'fs-extra'

async function tectonic(doc: string, opt: LaTeXOpts) {
  const tempdir = await mkdtemp(path.join(os.tmpdir(), 'tex-'))
  if (opt.inputs) {
    await copy(opt.inputs, tempdir)
  }
  const tectonic = spawn('tectonic', ['-'], { cwd: tempdir })
  tectonic.stdin.write(doc)
  tectonic.stdin.end()

  tectonic.stdout.on('data', (data) => {
    console.log('tectonic stdout:', data.toString().trim())
  })
  tectonic.stderr.on('data', (data) => {
    console.error('tectonic stderr:', data.toString().trim())
  })
  await new Promise<void>((resolve, reject) => {
    tectonic.on('close', (code) => {
      if (code !== 0) {
        console.log(`tectonic exited with code ${code}`)
        reject()
      }
      resolve()
    })
  })

  return createReadStream(path.join(tempdir, 'texput.pdf'))
}

export default function latex(doc: string, opt: LaTeXOpts) {
  return opt?.cmd === 'tectonic' ? tectonic(doc, opt) : nodeLatex(doc, opt)
}
