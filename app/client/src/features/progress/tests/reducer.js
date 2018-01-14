/**
 * @flow
 */

import reducer from '../reducer'
import { setSectionOrder, setProgress } from '../actions'
import type { ProgressState as State } from '../types'

describe('progress reducer', () => {
  it('should handle SET_SECTION_ORDER', () => {
    const initialState: State = {
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

    const newSectionOrder = [
      'templates',
      'profile',
      'work',
      'education',
      'skills',
      'projects',
      'awards'
    ]

    const expected: State = {
      ...initialState,
      prev: 'work',
      curr: 'education',
      next: 'skills',
      sections: newSectionOrder
    }

    const actual: State = reducer(
      initialState,
      setSectionOrder(newSectionOrder, 'education')
    )

    expect(actual).toEqual(expected)
  })

  it('should handle SET_PROGRESS', () => {
    const initialState: State = {
      progress: 45,
      prev: 'profile',
      curr: 'education',
      next: 'work',
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

    const expected: State = {
      ...initialState,
      progress: 60,
      prev: 'education',
      curr: 'work',
      next: 'skills'
    }

    const actual: State = reducer(
      initialState,
      setProgress(initialState.sections, 'work')
    )

    expect(actual).toEqual(expected)
  })
})
