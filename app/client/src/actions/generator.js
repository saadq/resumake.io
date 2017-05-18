import FileSaver from 'file-saver'
import isEqual from 'lodash/isEqual'
import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RESUME_SUCCESS,
  RESUME_FAILURE,
  SAVE_RESUME_DATA,
  REQUEST_SOURCE,
  RECEIVE_SOURCE,
  SET_PAGE_COUNT,
  SET_PAGE,
  PREV_PAGE,
  NEXT_PAGE
} from '../constants'

function selectTemplate(templateId) {
  return {
    type: SELECT_TEMPLATE,
    templateId
  }
}

function requestResume() {
  return {
    type: REQUEST_RESUME
  }
}

function resumeSuccess(url) {
  return {
    type: RESUME_SUCCESS,
    url
  }
}

function resumeFailure() {
  return {
    type: RESUME_FAILURE
  }
}

function saveResumeData(payload) {
  return {
    type: SAVE_RESUME_DATA,
    payload
  }
}

function generateResume(payload) {
  return async (dispatch, getState) => {
    const { status, resumeData } = getState().generator

    if (status === 'pending' || isEqual(resumeData, payload)) {
      return
    }

    dispatch(saveResumeData(payload))
    dispatch(requestResume())

    const req = {
      method: 'POST',
      headers: {
        'Accept': 'application/pdf',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      credentials: 'same-origin'
    }

    const { fetch, URL } = window
    const res = await fetch('/api/generate/resume', req)

    if (!res.ok) {
      dispatch(resumeFailure())
    } else {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      dispatch(resumeSuccess(url))
    }
  }
}

function requestSource() {
  return {
    type: REQUEST_SOURCE
  }
}

function receiveSource() {
  return {
    type: RECEIVE_SOURCE
  }
}

function downloadSource() {
  return async (dispatch, getState) => {
    const { fetch } = window
    const { status, isDownloading, resumeData } = getState().generator

    if (status === 'pending' || isDownloading) {
      return
    }

    dispatch(requestSource())

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData),
      credentials: 'same-origin'
    }

    const res = await fetch('/api/generate/source', req)
    const blob = await res.blob()

    FileSaver.saveAs(blob, 'resume.zip')
    dispatch(receiveSource())
  }
}

function setPageCount(pageCount) {
  return {
    type: SET_PAGE_COUNT,
    pageCount
  }
}

function setPage(page) {
  return {
    type: SET_PAGE,
    page
  }
}

function prevPage() {
  return {
    type: PREV_PAGE
  }
}

function nextPage() {
  return {
    type: NEXT_PAGE
  }
}

export {
  selectTemplate,
  generateResume,
  downloadSource,
  setPageCount,
  setPage,
  prevPage,
  nextPage
}
