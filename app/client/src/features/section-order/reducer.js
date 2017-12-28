/**
 * @flow
 */

import type { SectionOrderState as State } from './types'
import type { Action } from '../../app/types'

const initialState = [
  'Templates',
  'Profile',
  'Education',
  'Work',
  'Skills',
  'Projects',
  'Awards'
]

function sectionOrder(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SET_SECTION_ORDER':
      return action.sections
    default:
      return state
  }
}

export default sectionOrder
