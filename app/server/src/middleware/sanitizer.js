/**
 * @flow
 */

import sanitizeLatex from 'sanitize-latex'
import type { Middleware } from 'koa'

/**
 * Middleware that sanitizes the request body received from the form inputs.
 */

function sanitizer(): Middleware {
  return async (ctx, next) => {
    ctx.request.body = sanitize(ctx.request.body)
    await next()
  }
}

/**
 * Recursively sanitizes an object by removing empty values,
 * and normalizing strings with LaTeX symbols.
 */

function sanitize(obj: any = {}) {
  if (Array.isArray(obj)) {
    return obj
      .map(val => {
        if (val && typeof val === 'object') return sanitize(val)
        if (typeof val === 'string') return sanitizeLatex(trim(val))
        return val
      })
      .filter(val => !isEmpty(val))
  }

  const copy = {}

  Object.entries(obj).forEach(([key, val]) => {
    if (isEmpty(val)) {
      return
    }

    if (typeof val === 'object') {
      const sanitized = sanitize(val)
      if (!isEmptyObject(sanitized)) {
        copy[key] = sanitized
      }
    } else if (typeof val === 'string') {
      copy[key] = sanitizeLatex(trim(val))
    } else if (val != null) {
      copy[key] = val
    }
  })

  return copy
}

/**
 * Checks to see if the value is NaN, null, undefined,
 * an empty string, or an empty array/object.
 */

function isEmpty(val: any) {
  return (
    val == null || Number.isNaN(val) || isEmptyObject(val) || isEmptyString(val)
  )
}

/**
 * Checks to see if an object or an array is empty.
 */

function isEmptyObject(val: Object | Array<any>) {
  if (typeof val !== 'object') {
    return false
  }

  return Array.isArray(val) ? val.length === 0 : Object.keys(val).length === 0
}

/**
 * Checks to see if the value is an empty string or a string with just whitespace.
 */

function isEmptyString(val: any) {
  return typeof val === 'string' && !/\S/.test(trim(val))
}

/**
 * Converts multiple spaces in a string to a single space,
 * and removes leading and traililng whitespace.
 */

function trim(str: string) {
  return str.trim().replace(/\s\s+/g, ' ')
}

export { sanitize }
export default sanitizer
