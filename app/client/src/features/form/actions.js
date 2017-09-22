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

function clearJobDutyField(index: number, jobDutyCount: number): FormAction {
  return {
    type: 'CLEAR_JOB_DUTY_FIELD',
    index,
    jobDutyCount
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
  clearSchoolField,
  clearJobField,
  clearJobDutyField,
  clearProjectField,
  clearSkillField,
  clearAwardField
}
