/**
 * @flow
 */

import type { State } from './types'

function hasPrevSession(state: State) {
  return Object.values(state.form.resume.values).some(section => {
    if (typeof section !== 'object' || section == null) {
      return false
    }

    return Array.isArray(section)
      ? section.length > 1
      : Object.keys(section).length > 0
  })
}

export { hasPrevSession }
