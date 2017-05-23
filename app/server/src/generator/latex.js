'use strict'

const strToStream = require('string-to-stream')
const spawn = require('child_process').spawn
const through = require('through')
const fse = require('fs-extra')
const temp = require('temp')
const path = require('path')
const fs = require('fs')

/**
 * Generates a PDF stream from a LaTeX document.
 *
 * @param {String} src - The LaTeX document.
 * @param {Object} options - Optional compilation specifications.
 *
 * @return {DestroyableTransform}
 */
function latex(src, options) {
  const outputStream = through()

  /**
   * Emits the given error to the returned output stream.
   */
  const handleErrors = (err) => {
    outputStream.emit('error', err)
    outputStream.destroy()
  }

  /**
   * Emits errors from logs to output stream, and also gives full log to user if requested.
   */
  const printErrors = (tempPath, userLogPath) => {
    const errorLogPath = path.join(tempPath, 'texput.log')
    const errorLogStream = fs.createReadStream(errorLogPath)

    if (userLogPath) {
      const userLogStream = fs.createWriteStream(userLogPath)
      errorLogStream.pipe(userLogStream)
    }

    const errors = []

    errorLogStream.on('data', (data) => {
      const lines = data.toString().split('\n')

      lines.forEach((line, i) => {
        if (line.startsWith('! Undefined control sequence.')) {
          errors.push(lines[i - 1])
          errors.push(lines[i])
          errors.push(lines[i + 1])
        } else if (line.startsWith('!')) {
          errors.push(line)
        }
      })
    })

    errorLogStream.on('end', () => {
      const errMessage = `LaTeX Syntax Error\n${errors.join('\n')}`
      const error = new Error(errMessage)

      outputStream.emit('error', error)
    })
  }

  temp.mkdir('node-latex', (err, tempPath) => {
    if (err) {
      handleErrors(err)
    }

    let inputStream

    if (!src) {
      handleErrors(new Error('Error: No TeX document provided.'))
    }

    if (typeof src === 'string') {
      inputStream = strToStream(src)
    } else if (src.pipe) {
      inputStream = src
    } else {
      handleErrors(new Error('Error: Invalid TeX document.'))
    }

    options = options || {}

    // The path(s) to your TEXINPUTS.
    const inputs = options.inputs || tempPath

    // The path(s) to your font inputs for fontspec.
    const fonts = options.fonts || tempPath

    // The binary command to run (`pdflatex`, `xetex`, etc).
    const cmd = options.cmd || 'pdflatex'

    // The number of times to run LaTeX.
    const passes = options.passes || 1

    // The path to where the user wants to save the error log file to.
    const userLogPath = options.errorLogs

    // The current amount of times LaTeX has run so far.
    let completedPasses = 0

    if (passes > 1 && typeof src !== 'string') {
      const msg = 'Error: You can\'t process a stream twice. Pass a string to use multiple passes.'
      handleErrors(new Error(msg))

      return
    }

    /**
     * Combines all paths into a single PATH to be added to process.env.
     */
    const joinPaths = inputs =>
      Array.isArray(inputs)
        ? `${inputs.join(':')}:`
        : `${inputs}:`

    const args = [
      '-halt-on-error'
    ]

    const opts = {
      cwd: tempPath,
      env: Object.assign({}, process.env, {
        TEXINPUTS: joinPaths(inputs),
        TTFONTS: joinPaths(fonts),
        OPENTYPEFONTS: joinPaths(fonts)
      })
    }

    /**
     * Runs a LaTeX child process on the document stream
     * and then decides whether it needs to do it again.
     */
    const runLatex = (inputStream) => {
      const tex = spawn(cmd, args, opts)

      inputStream.pipe(tex.stdin)

      // Prevent Node from crashing on compilation error.
      tex.stdin.on('error', handleErrors)

      tex.on('error', () => {
        handleErrors(new Error(`Error: Unable to run ${cmd} command.`))
      })

      tex.on('exit', (code) => {
        if (code !== 0) {
          printErrors(tempPath, userLogPath)
          return
        }

        completedPasses++

        // Schedule another run if necessary.
        completedPasses >= passes
          ? returnDocument()
          : runLatex(strToStream(src))
      })
    }

    /**
     * Returns the PDF stream after the final run.
     */
    const returnDocument = () => {
      const pdfPath = path.join(tempPath, 'texput.pdf')
      const pdfStream = fs.createReadStream(pdfPath)

      pdfStream.pipe(outputStream)
      pdfStream.on('close', () => fse.removeSync(tempPath))
      pdfStream.on('error', handleErrors)
    }

    // Start the first run.
    runLatex(inputStream)
  })

  return outputStream
}

module.exports = latex
