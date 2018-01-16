/**
 * @flow
 */

import { readFile } from 'fs-promise'
import type { Middleware } from 'koa'

/**
 * Extracts and validates JSON from file upload
 */

function jsonResume(): Middleware {
  return async (ctx, next) => {
    const { request } = ctx

    try {
      if (request.files == null || typeof request.files !== 'object') {
        throw new Error('File upload failure')
      }

      const file = request.files['json-file']

      if (file == null || typeof file !== 'object') {
        throw new Error('File upload failure')
      }

      const { path } = file
      const data = await readFile(path)
      const json = JSON.parse(data)
      const validJSON = validateJSON(json)

      request.jsonResume = validJSON
      await next()
    } catch (err) {
      ctx.throw(400, `Invalid JSON: ${err.message}`)
    }
  }
}

/**
 * Extracts only the relevant JSON info from the JSON upload
 */

function validateJSON(json: Object): Object {
  const {
    selectedTemplate = 1,
    headings = {},
    basics = {},
    education = [],
    work = [{ highlights: [''] }],
    skills = [{ keywords: [''] }],
    projects = [{ keywords: [''] }],
    awards = []
  } = json

  const validJSON = {
    selectedTemplate,
    headings,
    basics,
    education,
    work,
    skills,
    projects,
    awards
  }

  return validJSON
}

export default jsonResume
