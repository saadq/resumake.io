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

function setProgress(progress: number): Action {
  return {
    type: 'SET_PROGRESS',
    progress
  }
}

export { prevSection, nextSection, setProgress }
