import { spawn } from 'node:child_process'
import { mkdtemp } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

export default async function latex(doc: string) {
  const tempdir = await mkdtemp(path.join(os.tmpdir(), 'tex-'));
  const tectonic = spawn('tectonic', ['-'], { cwd: tempdir })
  tectonic.stdin.write(doc)
  tectonic.stdin.end()

  tectonic.stdout.on('data', data => {
    console.log('tectonic stdout:', data.toString().trim())
  })
  tectonic.stderr.on('data', data => {
    console.error('tectonic stderr:', data.toString().trim())
  })
  await new Promise<void>((resolve, reject) => {
    tectonic.on('close', (code) => {
      if (code !== 0) {
        console.log(`tectonic exited with code ${code}`);
        reject()
      }
      resolve()
    })
  })

  return createReadStream(path.join(tempdir, 'texput.pdf'))
}
