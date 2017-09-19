/**
* @flow
*/

import type { FormAction } from './types'

function clearSchoolField(schoolCount: number): FormAction {
  return {
    type: 'CLEAR_SCHOOL_FIELD',
    schoolCount
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
  clearSchoolField,
  clearJobField,
  clearJobDutyField,
  clearProjectField,
  clearSkillField,
  clearAwardField
}
