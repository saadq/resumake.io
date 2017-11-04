/**
 * @flow
 */

import type { PreviewAction as Action } from './types'
import type { FormValues } from '../form/types'
import type { AsyncAction } from '../../shared/types'

function generateResumeRequest(): Action {
  return {
    type: 'GENERATE_RESUME_REQUEST'
  }
}

function generateResumeSuccess(resumeURL: string): Action {
  return {
    type: 'GENERATE_RESUME_SUCCESS',
    resumeURL
  }
}

function generateResumeFailure(): Action {
  return {
    type: 'GENERATE_RESUME_FAILURE'
  }
}

function generateResume(payload: FormValues): AsyncAction {
  return async (dispatch, getState) => {
    dispatch(generateResumeRequest())

    const { fetch, URL } = window

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    try {
      const response = await fetch('/api/generate/resume', request)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      dispatch(generateResumeSuccess(url))
    } catch (err) {
      dispatch(generateResumeFailure())
    }
  }
}

export { generateResume }
