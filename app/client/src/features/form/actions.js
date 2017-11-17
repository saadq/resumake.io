/**
 * @flow
 */

import type { FormAction as Action, FormValues } from './types'
import type { AsyncAction } from '../../shared/types'

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

function uploadJSONFailure(): Action {
  return {
    type: 'UPLOAD_JSON_FAILURE'
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
      const json = await response.json()
      dispatch(uploadJSONSuccess(json))
    } catch (err) {
      dispatch(uploadJSONFailure())
    }
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

function clearSkillField(skillCount: number): Action {
  return {
    type: 'CLEAR_SKILL_FIELD',
    skillCount
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

function clearSkillKeywordField(index: number, keywordCount: number): Action {
  return {
    type: 'CLEAR_SKILL_KEYWORD_FIELD',
    index,
    keywordCount
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

function clearProjectField(skillCount: number): Action {
  return {
    type: 'CLEAR_PROJECT_FIELD',
    skillCount
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

function clearProjectKeywordField(index: number, keywordCount: number): Action {
  return {
    type: 'CLEAR_PROJECT_KEYWORD_FIELD',
    index,
    keywordCount
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

function clearAwardField(): Action {
  return {
    type: 'CLEAR_AWARD_FIELD'
  }
}

export {
  uploadJSON,
  selectTemplate,
  addSchool,
  removeSchool,
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  addSkill,
  removeSkill,
  clearSkillField,
  addSkillKeyword,
  removeSkillKeyword,
  clearSkillKeywordField,
  addProject,
  removeProject,
  clearProjectField,
  addProjectKeyword,
  removeProjectKeyword,
  clearProjectKeywordField,
  addAward,
  removeAward,
  clearAwardField
}
