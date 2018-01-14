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
    try {
      if (ctx.request.files == null || typeof ctx.request.files !== 'object') {
        throw new Error('File upload failure')
      }

      const file = ctx.request.files['json-file']

      if (file == null || typeof file !== 'object') {
        throw new Error('File upload failure')
      }

      const { path } = file
      const data = await readFile(path)
      const json = JSON.parse(data)
      const validJSON = validateJSON(json)

      ctx.request.jsonResume = validJSON
      await next()
    } catch (err) {
      ctx.throw(400, `Invalid JSON: ${err.message}`)
    }
  }
}

/**
 * Validates JSON and extracts only the relevant JSON info from the JSON upload
 */

function validateJSON(json: Object): Object {
  const {
    selectedTemplate = 1,
    headings = [],
    basics = {},
    education = [],
    work = [{ highlights: [] }],
    skills = [{ keywords: [] }],
    projects = [{ keywords: [] }],
    awards = []
  } = json

  if (typeof selectedTemplate !== 'number') {
    throw new Error('"selectedTemplate" must be a number')
  }

  if (headings == null || typeof headings !== 'object') {
    throw new Error('"headings" must be an object')
  }

  if (Object.values(headings).some(val => typeof val !== 'string')) {
    throw new Error('each value in "headings" should be a string')
  }

  if (basics == null || typeof basics !== 'object') {
    throw new Error('"basics" must be an object')
  }

  if (
    Object.values(basics).some(
      val => val == null || (typeof val !== 'string' && typeof val !== 'object')
    )
  ) {
    throw new Error('each value in "basics" should be valid')
  }

  if (!education || !Array.isArray(education)) {
    throw new Error('"education" must be an array')
  }

  education.forEach(school => {
    if (Object.values(school).some(val => typeof val !== 'string')) {
      throw new Error('each "school" in "education" should be valid')
    }
  })

  if (!work || !Array.isArray(work)) {
    throw new Error('"work" must be an array')
  }

  work.forEach(job => {
    if (
      Object.values(job).some(
        val => typeof val !== 'string' && !Array.isArray(val)
      )
    ) {
      throw new Error('each "job" should be valid')
    }

    if (job.highlights.some(val => typeof val !== 'string')) {
      throw new Error('each job "highlight" be a string')
    }
  })

  if (!skills || !Array.isArray(skills)) {
    throw new Error('"skills" must be an array')
  }

  skills.forEach(skill => {
    if (
      Object.values(skill).some(
        val => typeof val !== 'string' && !Array.isArray(val)
      )
    ) {
      throw new Error('each "skill" should be valid')
    }

    if (skill.keywords.some(val => typeof val !== 'string')) {
      throw new Error('each skill "keyword" be a string')
    }
  })

  if (!projects || !Array.isArray(projects)) {
    throw new Error('"projects" must be an array')
  }

  projects.forEach(project => {
    if (
      Object.values(project).some(
        val => typeof val !== 'string' && !Array.isArray(val)
      )
    ) {
      throw new Error('each "project" should be valid')
    }

    if (project.keywords.some(val => typeof val !== 'string')) {
      throw new Error('each project "keyword" be a string')
    }
  })

  if (!awards || !Array.isArray(awards)) {
    throw new Error('"awards" must be an array')
  }

  awards.forEach(award => {
    if (Object.values(award).some(val => typeof val !== 'string')) {
      throw new Error('each "award" should be valid')
    }
  })

  const validJSON = {
    selectedTemplate,
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
