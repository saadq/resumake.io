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

function selectTemplate(templateId) {
  return {
    type: SELECT_TEMPLATE,
    templateId
  }
}

function addSchool() {
  return {
    type: ADD_SCHOOL
  }
}

function removeSchool() {
  return {
    type: REMOVE_SCHOOL
  }
}

function addJob() {
  return {
    type: ADD_JOB
  }
}

function removeJob() {
  return {
    type: REMOVE_JOB
  }
}

function incrementJobDuty(index) {
  return {
    type: INCREMENT_JOB_DUTY,
    index
  }
}

function decrementJobDuty(index) {
  return {
    type: DECREMENT_JOB_DUTY,
    index
  }
}

function addProject() {
  return {
    type: ADD_PROJECT
  }
}

function removeProject() {
  return {
    type: REMOVE_PROJECT
  }
}

function addSkill() {
  return {
    type: ADD_SKILL
  }
}

function removeSkill() {
  return {
    type: REMOVE_SKILL
  }
}

function setResumeURL(url) {
  return {
    type: SET_RESUME_URL,
    url
  }
}

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
