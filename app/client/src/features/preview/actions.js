/**
 * @flow
 */

import FileSaver from 'file-saver'
import type { PreviewAction as Action } from './types'
import type { FormValues } from '../form/types'
import type { AsyncAction } from '../../shared/types'

function saveResumeData(resumeData: FormValues): Action {
  return {
    type: 'SAVE_RESUME_DATA',
    resumeData
  }
}

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

function generateResume(resumeData: FormValues): AsyncAction {
  return async dispatch => {
    dispatch(generateResumeRequest())

    const { fetch, URL } = window
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/pdf',
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

function setPageCount(pageCount: number): Action {
  return {
    type: 'SET_PAGE_COUNT',
    pageCount
  }
}

function prevPage(): Action {
  return {
    type: 'PREV_PAGE'
  }
}

function nextPage(): Action {
  return {
    type: 'NEXT_PAGE'
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
    const { resume, isDownloading } = getState().preview
    const { status, data } = resume

    if (
      isDownloading ||
      status === 'pending' ||
      data == null ||
      Object.keys(data).length === 0
    ) {
      return
    }

    dispatch(downloadSourceRequest())

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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

export { generateResume, downloadSource, setPageCount, prevPage, nextPage }
