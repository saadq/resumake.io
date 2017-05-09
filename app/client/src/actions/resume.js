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
  SET_RESUME_URL
} from '../constants'

const selectTemplate = templateId => ({
  type: SELECT_TEMPLATE,
  templateId
})

const addSchool = () => ({
  type: ADD_SCHOOL
})

const removeSchool = () => ({
  type: REMOVE_SCHOOL
})

const addJob = () => ({
  type: ADD_JOB
})

const removeJob = () => ({
  type: REMOVE_JOB
})

const incrementJobDuty = index => ({
  type: INCREMENT_JOB_DUTY,
  index
})

const decrementJobDuty = index => ({
  type: DECREMENT_JOB_DUTY,
  index
})

const addProject = () => ({
  type: ADD_PROJECT
})

const removeProject = () => ({
  type: REMOVE_PROJECT
})

const addSkill = () => ({
  type: ADD_SKILL
})

const removeSkill = () => ({
  type: REMOVE_SKILL
})

const setResumeURL = url => ({
  type: SET_RESUME_URL,
  url
})

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
  setResumeURL
}
