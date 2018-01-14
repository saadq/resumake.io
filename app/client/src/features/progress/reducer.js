/**
 * @flow
 */

import type { ProgressState as State } from './types'
import type { Action } from '../../app/types'

const initialState = {
  progress: 0,
  prev: 'templates',
  curr: 'templates',
  next: 'profile',
  sections: [
    'templates',
    'profile',
    'education',
    'work',
    'skills',
    'projects',
    'awards'
  ]
}

function progress(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SET_SECTION_ORDER':
      return {
        ...state,
        sections: action.sections,
        prev: action.prev,
        curr: action.curr,
        next: action.next
      }

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
