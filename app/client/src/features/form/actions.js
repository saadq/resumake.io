/**
 * @flow
 */

import type { FormAction as Action } from './types'

function clearForm(): Action {
  return {
    type: 'CLEAR_FORM'
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

function clearSchoolField(): Action {
  return {
    type: 'CLEAR_SCHOOL_FIELD'
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

function clearJobField(jobCount: number): Action {
  return {
    type: 'CLEAR_JOB_FIELD',
    jobCount
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

function clearJobHighlightField(index: number, highlightCount: number): Action {
  return {
    type: 'CLEAR_JOB_HIGHLIGHT_FIELD',
    index,
    highlightCount
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
  clearForm,
  selectTemplate,
  addSchool,
  removeSchool,
  clearSchoolField,
  addJob,
  removeJob,
  clearJobField,
  addJobHighlight,
  removeJobHighlight,
  clearJobHighlightField,
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
