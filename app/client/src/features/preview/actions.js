/**
 * @flow
 */

import FileSaver from 'file-saver'
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

function saveResumeData(resumeData: FormValues): Action {
  return {
    type: 'SAVE_RESUME_DATA',
    resumeData
  }
}

function generateResume(resumeData: FormValues): AsyncAction {
  return async dispatch => {
    dispatch(generateResumeRequest())

    const { fetch, URL } = window
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resumeData)
    }

    try {
      const response = await fetch('/api/generate/resume', request)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      dispatch(saveResumeData(resumeData))
      dispatch(generateResumeSuccess(url))
    } catch (err) {
      dispatch(generateResumeFailure())
    }
  }
}

function downloadSourceRequest(): Action {
  return {
    type: 'DOWNLOAD_SOURCE_REQUEST'
  }
}

function downloadSourceSuccess(): Action {
  return {
    type: 'DOWNLOAD_SOURCE_SUCCESS'
  }
}

function downloadSourceFailure(): Action {
  return {
    type: 'DOWNLOAD_SOURCE_FAILURE'
  }
}

function downloadSource(): AsyncAction {
  return async (dispatch, getState) => {
    const { fetch } = window
    const { status, isDownloading, resumeData } = getState().preview

    if (
      isDownloading ||
      status === 'pending' ||
      resumeData == null ||
      Object.keys(resumeData).length === 0
    ) {
      return
    }

    dispatch(downloadSourceRequest())

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData),
      credentials: 'same-origin'
    }

    const res = await fetch('/api/generate/source', req)
    const blob = await res.blob()

    if (!res.ok) {
      dispatch(downloadSourceFailure())
    } else {
      FileSaver.saveAs(blob, 'resume.zip')
      dispatch(downloadSourceSuccess())
    }
  }
}

export { generateResume, downloadSource }
