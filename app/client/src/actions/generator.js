import isEqual from 'lodash/isEqual'
import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RECEIVE_RESUME,
  SAVE_PREVIOUS_RESUME
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
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    const { fetch, URL } = window
    const res = await fetch('/api/generate/resume', req)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    dispatch(receiveResume(url))
  }
}

export {
  selectTemplate,
  generateResume
}
