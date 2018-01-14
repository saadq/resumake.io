/**
 * @flow
 */

import { setSectionOrder, setProgress } from '../actions'
import type { ProgressAction as Action } from '../types'

const sections = [
  'templates',
  'profile',
  'education',
  'work',
  'skills',
  'projects',
  'awards'
]

describe('actions', () => {
  it('should be able to set the section order', () => {
    const expected: Action = {
      type: 'SET_SECTION_ORDER',
      sections,
      prev: 'profile',
      curr: 'education',
      next: 'work'
    }

    const actual: Action = setSectionOrder(sections, 'education')

    expect(actual).toEqual(expected)
  })

  it('should be to set the progress', () => {
    const curr = 'skills'
    const progressStep = Math.ceil(100 / sections.length)
    const progress = Math.min(progressStep * (sections.indexOf(curr) + 1), 100)

    const expected: Action = {
      type: 'SET_PROGRESS',
      progress,
      curr,
      prev: sections[Math.max(0, sections.indexOf(curr) - 1)],
      next: sections[Math.min(sections.length - 1, sections.indexOf(curr) + 1)]
    }

    const actual: Action = setProgress(sections, curr)

    expect(actual).toEqual(expected)
  })
})
