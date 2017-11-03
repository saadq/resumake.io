/**
 * @flow
 */

import type { UIState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {
  lightbox: {
    index: 0,
    isOpen: false
  }
}

function ui(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SHOW_LIGHTBOX':
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          isOpen: true,
          index: action.index
        }
      }

    case 'HIDE_LIGHTBOX':
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          isOpen: false,
          index: 0
        }
      }

    default:
      return state
  }
}

export default ui
