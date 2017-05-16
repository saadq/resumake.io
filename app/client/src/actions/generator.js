import FileSaver from 'file-saver'
import isEqual from 'lodash/isEqual'
import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RECEIVE_RESUME,
  SAVE_RESUME_DATA,
  REQUEST_SOURCE,
  RECEIVE_SOURCE,
  SET_TOTAL_PAGES,
  SET_CURRENT_PAGE,
  PREV_PAGE,
  NEXT_PAGE
} from '../constants'

function selectTemplate(templateId) {
  return {
    type: SELECT_TEMPLATE,
    templateId
  }
}

function generateResume(payload) {
  return async (dispatch, getState) => {
    const { isGenerating, resumeData } = getState().generator

    if (isGenerating || isEqual(resumeData, payload)) {
      return
    }

    dispatch({ type: REQUEST_RESUME })
    dispatch({ type: SAVE_RESUME_DATA, payload })

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

    dispatch({ type: RECEIVE_RESUME, url })
  }
}

function downloadSource() {
  return async (dispatch, getState) => {
    const { fetch } = window
    const { isGenerating, isDownloading, resumeData } = getState().generator

    if (isGenerating || isDownloading) {
      return
    }

    dispatch({ type: REQUEST_SOURCE })

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData),
      credentials: 'same-origin'
    }

    const res = await fetch('/api/generate/source', req)
    const blob = await res.blob()

    FileSaver.saveAs(blob, 'resume.zip')
    dispatch({ type: RECEIVE_SOURCE })
  }
}

function setTotalPages(pageCount) {
  return {
    type: SET_TOTAL_PAGES,
    pageCount
  }
}

function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
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
  setTotalPages,
  setCurrentPage,
  prevPage,
  nextPage
}
