import {
  SET_WINDOW_DIMENSIONS,
  ZOOM_IN,
  ZOOM_OUT,
  START_PRINT,
  STOP_PRINT,
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
  REMOVE_SKILL,
  ADD_AWARD,
  REMOVE_AWARD,
  SET_SECTION_NAVIGATION
} from '../constants'

function setWindowDimensions({ width, height }) {
  return {
    type: SET_WINDOW_DIMENSIONS,
    width,
    height
  }
}

function zoomIn() {
  return {
    type: ZOOM_IN
  }
}

function zoomOut() {
  return {
    type: ZOOM_OUT
  }
}

function startPrint() {
  return {
    type: START_PRINT
  }
}

function stopPrint() {
  return {
    type: STOP_PRINT
  }
}

function print(url) {
  if (/Android/i.test(navigator.userAgent)) {
    return // Android doesn't have native printing functionality
  }

  return async (dispatch, getState) => {
    dispatch(startPrint())

    const frame = document.createElement('iframe')

    frame.addEventListener('load', () => {
      const win = frame.contentWindow

      win.focus()
      win.print()
      win.addEventListener('focus', () => {
        document.body.removeChild(frame)
        dispatch(stopPrint())
      })
    })

    Object.assign(frame.style, {
      visibility: 'hidden',
      position: 'fixed',
      right: 0,
      bottom: 0
    })

    frame.src = url

    document.body.appendChild(frame)
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

function addAward() {
  return {
    type: ADD_AWARD
  }
}

function removeAward() {
  return {
    type: REMOVE_AWARD
  }
}

function setSectionNavigation(curr) {
  const sections = [
    'templates',
    'profile',
    'education',
    'experience',
    'skills',
    'projects',
    'awards',
    'preview'
  ]

  const currIndex = sections.indexOf(curr)
  const prevIndex = Math.max(currIndex - 1, 0)
  const nextIndex = Math.min(currIndex + 1, sections.length - 1)

  const prev = sections[prevIndex]
  const next = sections[nextIndex]

  return {
    type: SET_SECTION_NAVIGATION,
    prev,
    curr,
    next
  }
}

export {
  setWindowDimensions,
  zoomIn,
  zoomOut,
  startPrint,
  stopPrint,
  print,
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
  removeSkill,
  addAward,
  removeAward,
  setSectionNavigation
}
