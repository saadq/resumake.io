import isEqual from 'lodash/isEqual'
import {
  SELECT_TEMPLATE,
  ADD_SCHOOL,
  REMOVE_SCHOOL,
  ADD_JOB,
  REMOVE_JOB,
  INCREMENT_JOB_DUTY,
  DECREMENT_JOB_DUTY,
  ADD_PROJECT,
  REMOVE_PROJECT,
  ADD_SKILL,
  REMOVE_SKILL,
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

function addSchool() {
  return {
    type: ADD_SCHOOL
  }
}

function removeSchool() {
  return {
    type: REMOVE_SCHOOL
  }
}

function addJob() {
  return {
    type: ADD_JOB
  }
}

function removeJob() {
  return {
    type: REMOVE_JOB
  }
}

function incrementJobDuty(index) {
  return {
    type: INCREMENT_JOB_DUTY,
    index
  }
}

function decrementJobDuty(index) {
  return {
    type: DECREMENT_JOB_DUTY,
    index
  }
}

function addProject() {
  return {
    type: ADD_PROJECT
  }
}

function removeProject() {
  return {
    type: REMOVE_PROJECT
  }
}

function addSkill() {
  return {
    type: ADD_SKILL
  }
}

function removeSkill() {
  return {
    type: REMOVE_SKILL
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
    const { isGenerating, prevResume } = getState().resume.generator

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
  addSchool,
  removeSchool,
  addJob,
  removeJob,
  incrementJobDuty,
  decrementJobDuty,
  addProject,
  removeProject,
  addSkill,
  removeSkill,
  generateResume
}
