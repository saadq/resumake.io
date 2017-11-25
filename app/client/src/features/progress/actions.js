/**
 * @flow
 */

import type { ProgressAction as Action } from './types'

const sections = [
  'templates',
  'profile',
  'education',
  'work',
  'skills',
  'projects',
  'awards',
  'preview'
]

function setProgress(curr: string): Action {
  const progressStep = Math.ceil(100 / sections.length)
  const progress = progressStep * (sections.indexOf(curr) + 1)

  return {
    type: 'SET_PROGRESS',
    progress,
    curr,
    prev: sections[Math.max(0, sections.indexOf(curr) - 1)],
    next: sections[Math.min(sections.length - 1, sections.indexOf(curr) + 1)]
  }
}

export { setProgress }
