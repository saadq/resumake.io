function sanitize(obj = {}) {
  if (Array.isArray(obj)) {
    return obj
      .map((val) => {
        if (isObject(val)) return sanitize(val)
        if (isString(val)) return normalizeLatexSymbols(val)
        return val
      })
      .filter(val => val != null && !Number.isNaN(val) && !isEmptyObject(val) && !isEmptyString(val))
  }

  const copy = {}

  Object.entries(obj).forEach(([key, val]) => {
    if (val == null || Number.isNaN(val) || isEmptyObject(val) || isEmptyString(val)) {
      return
    }

    if (isObject(val)) {
      const sanitized = sanitize(val)

      if (!isEmptyObject(sanitized)) {
        copy[key] = sanitize(val)
      }
    } else if (isString(val)) {
      copy[key] = normalizeLatexSymbols(val)
    } else if (val != null) {
      copy[key] = val
    }
  })

  return copy
}

function normalizeLatexSymbols(str) {
  const symbolMap = {
    '\\': '\\textbackslash{}',
    '^': '\\textasciicircum{}',
    '~': '\\textasciitilde{}',
    '{': '\\{',
    '}': '\\}',
    '$': '\\$',
    '&': '\\&',
    '#': '\\#',
    '_': '\\_',
    '%': '\\%'
  }

  const symbols = Object.keys(symbolMap)
  const trimmedStr = trim(str)

  return Array.from(trimmedStr)
    .map(char => symbols.includes(char) ? symbolMap[char] : char)
    .join('')
}

function isObject(val) {
  return val && typeof val === 'object'
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

function isString(val) {
  return typeof val === 'string'
}

// function isNumber(val) {
//   return val && typeof val === 'number'
// }

// function isNotEmpty(val) {
//   if (val == null) {
//     return false
//   }
//
//   if (isString(val) && isOnlyWhitespace(val)) {
//     return false
//   }
//
//   if (isNumber(val) && Number.isNaN(val)) {
//     return false
//   }
//
//   return true
// }
//
function isOnlyWhitespace(str) {
  return !(/\S/).test(str.trim())
}

function trim(str) {
  return str.trim().replace(/\s\s+/g, ' ')
}

module.exports = sanitize
