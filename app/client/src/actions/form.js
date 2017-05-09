import {
  CLEAR_SCHOOL_FIELD,
  CLEAR_JOB_FIELD,
  CLEAR_JOB_DUTY_FIELD,
  CLEAR_PROJECT_FIELD,
  CLEAR_SKILL_FIELD
} from '../constants'

const clearSchoolField = schoolCount => ({
  type: CLEAR_SCHOOL_FIELD,
  schoolCount
})

const clearJobField = jobCount => ({
  type: CLEAR_JOB_FIELD,
  jobCount
})

const clearJobDutyField = (index, jobDutyCount) => ({
  type: CLEAR_JOB_DUTY_FIELD,
  index,
  jobDutyCount
})

const clearProjectField = projectCount => ({
  type: CLEAR_PROJECT_FIELD,
  projectCount
})

const clearSkillField = skillCount => ({
  type: CLEAR_SKILL_FIELD,
  skillCount
})

export {
  clearSchoolField,
  clearJobField,
  clearJobDutyField,
  clearProjectField,
  clearSkillField
}
