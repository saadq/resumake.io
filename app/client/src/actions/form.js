import {
  CLEAR_SCHOOL_FIELD,
  CLEAR_JOB_FIELD,
  CLEAR_JOB_DUTY_FIELD,
  CLEAR_PROJECT_FIELD,
  CLEAR_SKILL_FIELD,
  CLEAR_AWARD_FIELD
} from '../constants'

function clearSchoolField(schoolCount) {
  return {
    type: CLEAR_SCHOOL_FIELD,
    schoolCount
  }
}

function clearJobField(jobCount) {
  return {
    type: CLEAR_JOB_FIELD,
    jobCount
  }
}

function clearJobDutyField(index, jobDutyCount) {
  return {
    type: CLEAR_JOB_DUTY_FIELD,
    index,
    jobDutyCount
  }
}

function clearProjectField(projectCount) {
  return {
    type: CLEAR_PROJECT_FIELD,
    projectCount
  }
}

function clearSkillField(skillCount) {
  return {
    type: CLEAR_SKILL_FIELD,
    skillCount
  }
}

function clearAwardField(awardCount) {
  return {
    type: CLEAR_AWARD_FIELD,
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
