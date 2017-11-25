/**
 * @flow
 */

import type { ProgressState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {
  progress: 0,
  prev: 'templates',
  curr: 'templates',
  next: 'profile'
}

function progress(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.progress,
        prev: action.prev,
        curr: action.curr,
        next: action.next
      }

    default:
      return state
  }
}

export default progress
