/**
 * @flow
 */

import type { ProgressAction as Action } from './types'

function prevSection(): Action {
  return {
    type: 'PREV_SECTION'
  }
}

function nextSection(): Action {
  return {
    type: 'NEXT_SECTION'
  }
}

export { prevSection, nextSection }
