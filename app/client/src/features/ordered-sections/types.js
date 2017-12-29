/**
 * @flow
 */

import type { Section } from '../../common/types'

type SectionOrderState = {
  progress: number,
  prev: Section,
  curr: Section,
  next: Section,
  sections: Array<Section>
}

type SectionOrderAction =
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

export type { SectionOrderState, SectionOrderAction }
