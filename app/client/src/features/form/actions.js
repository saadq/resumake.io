/**
 * @flow
 */

import { generateResume } from '../preview/actions'
import type { FormAction as Action, FormValues } from './types'
import type { AsyncAction } from '../../app/types'

function uploadJSONRequest(): Action {
  return {
    type: 'UPLOAD_JSON_REQUEST'
  }
}

function uploadJSONSuccess(json: FormValues): Action {
  return {
    type: 'UPLOAD_JSON_SUCCESS',
    json
  }
}

function uploadJSONFailure(errMessage: string): Action {
  return {
    type: 'UPLOAD_JSON_FAILURE',
    errMessage
  }
}

function uploadJSON(file: File): AsyncAction {
  return async (dispatch, getState) => {
    dispatch(uploadJSONRequest())

    const { fetch, FormData } = window
    const data = new FormData()

    data.append('json-file', file)

    const request = {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    }

    try {
      const response = await fetch('/api/upload', request)
      if (response.ok) {
        const json = await response.json()
        dispatch(uploadJSONSuccess(json))
      } else {
        const errMessage = await response.text()
        dispatch(uploadJSONFailure(errMessage))
      }
    } catch (err) {
      dispatch(uploadJSONFailure(err.message))
    }
  }
}

function uploadFileAndGenerateResume(file: File): AsyncAction {
  return async (dispatch, getState) => {
    await dispatch(uploadJSON(file))
    const resumeData = getState().form.resume.values
    const sections = getState().progress.sections
    await dispatch(generateResume({ ...resumeData, sections }))
  }
}

function selectTemplate(templateId: number): Action {
  return {
    type: 'SELECT_TEMPLATE',
    templateId
  }
}

function addSchool(): Action {
  return {
    type: 'ADD_SCHOOL'
  }
}

function removeSchool(): Action {
  return {
    type: 'REMOVE_SCHOOL'
  }
}

function addProfileSummary(): Action {
  return {
    type: 'ADD_PROFILE_SUMMARY'
  }
}

function removeProfileSummary(): Action {
  return {
    type: 'REMOVE_PROFILE_SUMMARY'
  }
}

function addJob(): Action {
  return {
    type: 'ADD_JOB'
  }
}

function removeJob(): Action {
  return {
    type: 'REMOVE_JOB'
  }
}

function addJobHighlight(index: number): Action {
  return {
    type: 'ADD_JOB_HIGHLIGHT',
    index
  }
}

function removeJobHighlight(index: number): Action {
  return {
    type: 'REMOVE_JOB_HIGHLIGHT',
    index
  }
}

function addSkill(): Action {
  return {
    type: 'ADD_SKILL'
  }
}

function removeSkill(): Action {
  return {
    type: 'REMOVE_SKILL'
  }
}

function addSkillKeyword(index: number): Action {
  return {
    type: 'ADD_SKILL_KEYWORD',
    index
  }
}

function removeSkillKeyword(index: number): Action {
  return {
    type: 'REMOVE_SKILL_KEYWORD',
    index
  }
}

function addProject(): Action {
  return {
    type: 'ADD_PROJECT'
  }
}

function removeProject(): Action {
  return {
    type: 'REMOVE_PROJECT'
  }
}

function addProjectKeyword(index: number): Action {
  return {
    type: 'ADD_PROJECT_KEYWORD',
    index
  }
}

function removeProjectKeyword(index: number): Action {
  return {
    type: 'REMOVE_PROJECT_KEYWORD',
    index
  }
}

function addAward(): Action {
  return {
    type: 'ADD_AWARD'
  }
}

function removeAward(): Action {
  return {
    type: 'REMOVE_AWARD'
  }
}

export {
  uploadJSON,
  uploadJSONRequest,
  uploadJSONSuccess,
  uploadJSONFailure,
  selectTemplate,
  addSchool,
  removeSchool,
  addProfileSummary,
  removeProfileSummary,
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  addSkill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword,
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword,
  addAward,
  removeAward,
  uploadFileAndGenerateResume
}
