/**
 * @flow
 */

type Section =
  | 'Templates'
  | 'Profile'
  | 'Education'
  | 'Work'
  | 'Skills'
  | 'Projects'
  | 'Awards'

type SectionOrderState = Array<Section>
type SectionOrderAction = {
  type: 'SET_SECTION_ORDER',
  sections: Array<Section>
}

export type { Section, SectionOrderState, SectionOrderAction }
