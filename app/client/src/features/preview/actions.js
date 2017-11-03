/**
 * @flow
 */

import type { PreviewAction as Action } from './types'

function setResumeURL(resumeURL: string): Action {
  return {
    type: 'SET_RESUME_URL',
    resumeURL
  }
}

export { setResumeURL }
