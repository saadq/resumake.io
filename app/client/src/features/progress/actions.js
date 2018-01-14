/**
 * @flow
 */

import type { ProgressAction as Action } from './types'
import type { Section } from '../../common/types'

function setSectionOrder(sections: Array<Section>, curr: Section): Action {
  return {
    type: 'SET_SECTION_ORDER',
    sections,
    curr,
    prev: sections[Math.max(0, sections.indexOf(curr) - 1)],
    next: sections[Math.min(sections.length - 1, sections.indexOf(curr) + 1)]
  }
}

function setProgress(sections: Array<Section>, curr: Section): Action {
  const progressStep = Math.ceil(100 / sections.length)
  const progress = Math.min(progressStep * (sections.indexOf(curr) + 1), 100)

  return {
    type: 'SET_PROGRESS',
    progress,
    curr,
    prev: sections[Math.max(0, sections.indexOf(curr) - 1)],
    next: sections[Math.min(sections.length - 1, sections.indexOf(curr) + 1)]
  }
}

export { setSectionOrder, setProgress }
