/**
 * @flow
 */

import type { FormAction } from './types'

function addSchool(): FormAction {
  return {
    type: 'ADD_SCHOOL'
  }
}

function removeSchool(): FormAction {
  return {
    type: 'REMOVE_SCHOOL'
  }
}

function clearSchoolField(): FormAction {
  return {
    type: 'CLEAR_SCHOOL_FIELD'
  }
}

function addJob(): FormAction {
  return {
    type: 'ADD_JOB'
  }
}

function removeJob(): FormAction {
  return {
    type: 'REMOVE_JOB'
  }
}

function clearJobField(jobCount: number): FormAction {
  return {
    type: 'CLEAR_JOB_FIELD',
    jobCount
  }
}

function addJobHighlight(index: number): FormAction {
  return {
    type: 'ADD_JOB_HIGHLIGHT',
    index
  }
}

function removeJobHighlight(index: number): FormAction {
  return {
    type: 'REMOVE_JOB_HIGHLIGHT',
    index
  }
}

function clearJobHighlightField(
  index: number,
  highlightCount: number
): FormAction {
  return {
    type: 'CLEAR_JOB_HIGHLIGHT_FIELD',
    index,
    highlightCount
  }
}

function addSkill(): FormAction {
  return {
    type: 'ADD_SKILL'
  }
}

function removeSkill(): FormAction {
  return {
    type: 'REMOVE_SKILL'
  }
}

function clearSkillField(skillCount: number): FormAction {
  return {
    type: 'CLEAR_SKILL_FIELD',
    skillCount
  }
}

function addSkillKeyword(index: number): FormAction {
  return {
    type: 'ADD_SKILL_KEYWORD',
    index
  }
}

function removeSkillKeyword(index: number): FormAction {
  return {
    type: 'REMOVE_SKILL_KEYWORD',
    index
  }
}

function clearSkillKeywordField(
  index: number,
  keywordCount: number
): FormAction {
  return {
    type: 'CLEAR_SKILL_KEYWORD_FIELD',
    index,
    keywordCount
  }
}

function addProject(): FormAction {
  return {
    type: 'ADD_PROJECT'
  }
}

function removeProject(): FormAction {
  return {
    type: 'REMOVE_PROJECT'
  }
}

function clearProjectField(skillCount: number): FormAction {
  return {
    type: 'CLEAR_PROJECT_FIELD',
    skillCount
  }
}

function addProjectKeyword(index: number): FormAction {
  return {
    type: 'ADD_PROJECT_KEYWORD',
    index
  }
}

function removeProjectKeyword(index: number): FormAction {
  return {
    type: 'REMOVE_PROJECT_KEYWORD',
    index
  }
}

function clearProjectKeywordField(
  index: number,
  keywordCount: number
): FormAction {
  return {
    type: 'CLEAR_PROJECT_KEYWORD_FIELD',
    index,
    keywordCount
  }
}

function addAward(): FormAction {
  return {
    type: 'ADD_AWARD'
  }
}

function removeAward(): FormAction {
  return {
    type: 'REMOVE_AWARD'
  }
}

function clearAwardField(): FormAction {
  return {
    type: 'CLEAR_AWARD_FIELD'
  }
}

export {
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
