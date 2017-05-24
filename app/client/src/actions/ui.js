import {
  SET_WINDOW_DIMENSIONS,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_SIDE_NAV,
  HIDE_SIDE_NAV,
  ADD_SCHOOL,
  REMOVE_SCHOOL,
  ADD_JOB,
  REMOVE_JOB,
  INCREMENT_JOB_DUTY,
  DECREMENT_JOB_DUTY,
  ADD_PROJECT,
  REMOVE_PROJECT,
  ADD_SKILL,
  REMOVE_SKILL
} from '../constants'

function setWindowDimensions({ width, height }) {
  return {
    type: SET_WINDOW_DIMENSIONS,
    width,
    height
  }
}

function showModal(modalSrc) {
  return {
    type: SHOW_MODAL,
    modalSrc
  }
}

function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

function showSideNav() {
  return {
    type: SHOW_SIDE_NAV
  }
}

function hideSideNav() {
  return {
    type: HIDE_SIDE_NAV
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

export {
  setWindowDimensions,
  showModal,
  hideModal,
  showSideNav,
  hideSideNav,
  addSchool,
  removeSchool,
  addJob,
  removeJob,
  incrementJobDuty,
  decrementJobDuty,
  addProject,
  removeProject,
  addSkill,
  removeSkill
}
