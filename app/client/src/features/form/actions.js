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

function clearSchoolField(): FormAction {
  return {
    type: 'CLEAR_SCHOOL_FIELD'
  }
}

function clearJobField(jobCount: number): FormAction {
  return {
    type: 'CLEAR_JOB_FIELD',
    jobCount
  }
}

function clearJobHighlightField(
  index: number,
  jobHighlightCount: number
): FormAction {
  return {
    type: 'CLEAR_JOB_HIGHLIGHT_FIELD',
    index,
    jobHighlightCount
  }
}

function clearProjectField(projectCount: number): FormAction {
  return {
    type: 'CLEAR_PROJECT_FIELD',
    projectCount
  }
}

function clearSkillField(skillCount: number): FormAction {
  return {
    type: 'CLEAR_SKILL_FIELD',
    skillCount
  }
}

function clearAwardField(awardCount: number): FormAction {
  return {
    type: 'CLEAR_AWARD_FIELD',
    awardCount
  }
}

export {
  addSchool,
  removeSchool,
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  clearSchoolField,
  clearJobField,
  clearJobHighlightField,
  clearProjectField,
  clearSkillField,
  clearAwardField
}
