import FileSaver from 'file-saver'
import isEqual from 'lodash/isEqual'
import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RECEIVE_RESUME,
  SAVE_PREVIOUS_RESUME,
  REQUEST_SOURCE,
  RECEIVE_SOURCE,
  SET_PAGE
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

function receiveResume(url) {
  return {
    type: RECEIVE_RESUME,
    url
  }
}

function savePreviousResume(payload) {
  return {
    type: SAVE_PREVIOUS_RESUME,
    payload
  }
}

function generateResume(payload) {
  return async (dispatch, getState) => {
    const { isGenerating, prevResume } = getState().generator

    if (isGenerating || isEqual(prevResume, payload)) {
      return
    }

    dispatch(requestResume())
    dispatch(savePreviousResume(payload))

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
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    dispatch(receiveResume(url))
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
    const { isGenerating, isDownloading, prevResume } = getState().generator

    if (isGenerating || isDownloading) {
      return
    }

    dispatch(requestSource())

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prevResume),
      credentials: 'same-origin'
    }

    const res = await fetch('/api/generate/source', req)
    const blob = await res.blob()

    FileSaver.saveAs(blob, 'resume.zip')
    dispatch(receiveSource())
  }
}

function setPage(page) {
  return {
    type: SET_PAGE,
    page
  }
}

export {
  selectTemplate,
  generateResume,
  downloadSource,
  setPage
}
