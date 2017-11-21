/**
 * @flow
 */

import type { ProgressState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {
  sections: [
    'templates',
    'profile',
    'education',
    'work',
    'skills',
    'projects',
    'awards',
    'preview'
  ],
  progress: 0,
  prev: 'templates',
  curr: 'templates',
  next: 'profile'
}

function progress(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'PREV_SECTION':
      if (state.curr === state.sections[0]) {
        return state
      }

      return {
        ...state,
        prev:
          state.sections[Math.max(0, state.sections.indexOf(state.prev) - 1)],
        curr: state.prev,
        next: state.curr
      }

    case 'NEXT_SECTION':
      if (state.curr === state.sections[state.sections.length - 1]) {
        return state
      }

      return {
        ...state,
        prev: state.curr,
        curr: state.next,
        next:
          state.sections[
            Math.min(
              state.sections.indexOf(state.next) + 1,
              state.sections.length - 1
            )
          ]
      }

    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.progress
      }

    default:
      return state
  }
}

export default progress
