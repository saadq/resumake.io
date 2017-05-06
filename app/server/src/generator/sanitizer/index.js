const sanitizeLatex = require('sanitize-latex')

/**
 * Recursively sanitizes an object by removing empty values,
 * and normalizing strings with LaTeX symbols.
 *
 * @param {Object} obj - The object to be sanitized.
 *
 * @return {Object} - A sanitized copy of the input object.
 */
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

/**
 * Checks to see if the value is NaN, null, undefined,
 * an empty string, or an empty array/object.
 *
 * @param {any} val - The value to be checked.
 *
 * @return {boolean}
 */
function isEmpty(val) {
  return val == null || Number.isNaN(val) || isEmptyObject(val) || isEmptyString(val)
}

/**
 * Checks to see if an object or an array is empty.
 *
 * @param {Object|Array} val - The object to be checked.
 *
 * @return {boolean}
 */
function isEmptyObject(val) {
  if (!isObject(val)) {
    return false
  }

  return Array.isArray(val)
    ? val.length === 0
    : Object.keys(val).length === 0
}

/**
 * Checks to see if the value is an empty string or a string with just whitespace.
 *
 * @param {string} val - The value to be checked.
 *
 * @return {boolean}
 */
function isEmptyString(val) {
  return isString(val) && isOnlyWhitespace(val)
}

/**
 * Checks to see if a value is a object (excluding null).
 *
 * @param {any} val - The value to be checked.
 *
 * @return {boolean}
 */
function isObject(val) {
  return val && typeof val === 'object'
}

/**
 * Checks to see if a value is a string.
 *
 * @param {any} val - The value to be checked.
 *
 * @return {boolean}
 */
function isString(val) {
  return typeof val === 'string'
}

/**
 * Checks to see if a string only contains whitespace.
 *
 * @param {string} str - The string to be checked.
 *
 * @return {boolean}
 */
function isOnlyWhitespace(str) {
  return !(/\S/).test(str.trim())
}

/**
 * Converts multiple spaces in a string to a single space,
 * and removes leading and traililng whitespace in the string.
 *
 * @param {string} str - The string to be trimmed
 *
 * @return {string} - The trimmed string.
 */
function trim(str) {
  return str.trim().replace(/\s\s+/g, ' ')
}

module.exports = sanitize
