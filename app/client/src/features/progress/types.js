/**
 * @flow
 */

import type { Section } from '../../common/types'

type ProgressState = {
  progress: number,
  prev: Section,
  curr: Section,
  next: Section,
  sections: Array<Section>
}

type ProgressAction =
  | {
      type: 'SET_SECTION_ORDER',
      sections: Array<Section>,
      curr: Section,
      prev: Section,
      next: Section
    }
  | {
      type: 'SET_PROGRESS',
      progress: number,
      prev: Section,
      curr: Section,
      next: Section
    }

export type { ProgressState, ProgressAction }
