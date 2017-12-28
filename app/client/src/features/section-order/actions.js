/**
 * @flow
 */

import type { Section, SectionOrderAction as Action } from './types'

function setSectionOrder(sections: Array<Section>): Action {
  return {
    type: 'SET_SECTION_ORDER',
    sections
  }
}

export { setSectionOrder }
