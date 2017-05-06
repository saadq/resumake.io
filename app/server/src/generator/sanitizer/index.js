const sanitizeLatex = require('sanitize-latex')

function sanitize(obj = {}) {
  if (Array.isArray(obj)) {
    return obj
      .map((val) => {
        if (isObject(val)) return sanitize(val)
        if (isString(val)) return sanitizeLatex(trim(val))
        return val
      })
      .filter(val => !isEmpty(val))
  }

  const copy = {}

  Object.entries(obj).forEach(([key, val]) => {
    if (isEmpty(val)) {
      return
    }

    if (isObject(val)) {
      const sanitized = sanitize(val)

      if (!isEmptyObject(sanitized)) {
        copy[key] = sanitize(val)
      }
    } else if (isString(val)) {
      copy[key] = sanitizeLatex(trim(val))
    } else if (val != null) {
      copy[key] = val
    }
  })

  return copy
}

function isEmpty(val) {
  return val == null || Number.isNaN(val) || isEmptyObject(val) || isEmptyString(val)
}

function isEmptyObject(val) {
  if (!isObject(val)) {
    return false
  }

  return Array.isArray(val)
    ? val.length === 0
    : Object.keys(val).length === 0
}

function isEmptyString(val) {
  return isString(val) && isOnlyWhitespace(val)
}

function isObject(val) {
  return val && typeof val === 'object'
}

function isString(val) {
  return typeof val === 'string'
}

function isOnlyWhitespace(str) {
  return !(/\S/).test(str.trim())
}

function trim(str) {
  return str.trim().replace(/\s\s+/g, ' ')
}

module.exports = sanitize
