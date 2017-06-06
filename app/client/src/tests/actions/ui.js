import test from 'ava'
import { UIActions } from '../../actions'
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
} from '../../constants'

const {
  setWindowDimensions,
  zoomIn,
  zoomOut,
  startPrint,
  stopPrint,
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
} = UIActions

test('ui actions', async t => {
  t.deepEqual(setWindowDimensions({ width: 500, height: 500 }), {
    type: SET_WINDOW_DIMENSIONS,
    width: 500,
    height: 500
  })
  t.deepEqual(zoomIn(), { type: ZOOM_IN })
  t.deepEqual(zoomOut(), { type: ZOOM_OUT })
  t.deepEqual(startPrint(), { type: START_PRINT })
  t.deepEqual(stopPrint(), { type: STOP_PRINT })
  t.deepEqual(showModal('/some-image.png'), {
    type: SHOW_MODAL,
    modalSrc: '/some-image.png'
  })
  t.deepEqual(hideModal(), { type: HIDE_MODAL })
  t.deepEqual(showSideNav(), { type: SHOW_SIDE_NAV })
  t.deepEqual(hideSideNav(), { type: HIDE_SIDE_NAV })
  t.deepEqual(addSchool(), { type: ADD_SCHOOL })
  t.deepEqual(removeSchool(), { type: REMOVE_SCHOOL })
  t.deepEqual(addJob(), { type: ADD_JOB })
  t.deepEqual(removeJob(), { type: REMOVE_JOB })
  t.deepEqual(incrementJobDuty(1), { type: INCREMENT_JOB_DUTY, index: 1 })
  t.deepEqual(decrementJobDuty(2), { type: DECREMENT_JOB_DUTY, index: 2 })
  t.deepEqual(addSkill(), { type: ADD_SKILL })
  t.deepEqual(removeSkill(), { type: REMOVE_SKILL })
  t.deepEqual(addProject(), { type: ADD_PROJECT })
  t.deepEqual(removeProject(), { type: REMOVE_PROJECT })
  t.deepEqual(addAward(), { type: ADD_AWARD })
  t.deepEqual(removeAward(), { type: REMOVE_AWARD })
  t.deepEqual(setSectionNavigation('profile'), {
    type: SET_SECTION_NAVIGATION,
    prev: 'templates',
    curr: 'profile',
    next: 'education'
  })
})
