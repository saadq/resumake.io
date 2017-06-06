import test from 'ava'
import reducer from '../../reducers/ui'
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

test('it can set the window dimensions', async t => {
  const state = {
    dimensions: {
      width: 0,
      height: 0
    }
  }

  const expected = {
    dimensions: {
      width: 1440,
      height: 500
    }
  }

  const actual = reducer(state, {
    type: SET_WINDOW_DIMENSIONS,
    width: 1440,
    height: 500
  })

  t.deepEqual(expected, actual)
})

test('it can zoom in', async t => {
  const state = { scale: 1.5 }
  const expected = { scale: 1 }
  const actual = reducer(state, { type: ZOOM_IN })

  t.deepEqual(expected, actual)
})

test('it can zoom out', async t => {
  const state = { scale: 1.5 }
  const expected = { scale: 2 }
  const actual = reducer(state, { type: ZOOM_OUT })

  t.deepEqual(expected, actual)
})

test('it can start printing a resume', async t => {
  const state = { isPrinting: false }
  const expected = { isPrinting: true }
  const actual = reducer(state, { type: START_PRINT })

  t.deepEqual(expected, actual)
})

test('it can finish printing a resume', async t => {
  const state = { isPrinting: true }
  const expected = { isPrinting: false }
  const actual = reducer(state, { type: STOP_PRINT })

  t.deepEqual(expected, actual)
})

test('it can show the modal', async t => {
  const state = {
    modal: {
      active: false,
      src: null
    }
  }

  const expected = {
    modal: {
      active: true,
      src: '/some-img.png'
    }
  }

  const actual = reducer(state, { type: SHOW_MODAL, modalSrc: '/some-img.png' })

  t.deepEqual(expected, actual)
})

test('it can hide the modal', async t => {
  const state = {
    modal: {
      active: true,
      src: '/some-img.png'
    }
  }

  const expected = {
    modal: {
      active: false,
      src: null
    }
  }

  const actual = reducer(state, { type: HIDE_MODAL })

  t.deepEqual(expected, actual)
})

test('it can show the side nav', async t => {
  const state = {
    sideNav: {
      active: false
    }
  }

  const expected = {
    sideNav: {
      active: true
    }
  }

  const actual = reducer(state, { type: SHOW_SIDE_NAV })

  t.deepEqual(expected, actual)
})

test('it can hide the side nav', async t => {
  const state = {
    sideNav: {
      active: true
    }
  }

  const expected = {
    sideNav: {
      active: false
    }
  }

  const actual = reducer(state, { type: HIDE_SIDE_NAV })

  t.deepEqual(expected, actual)
})

test('it can add a school', async t => {
  const state = { schoolCount: 0 }
  const expected = { schoolCount: 1 }
  const actual = reducer(state, { type: ADD_SCHOOL })

  t.deepEqual(expected, actual)
})

test('it can remove a school', async t => {
  const state = { schoolCount: 2 }
  const expected = { schoolCount: 1 }
  const actual = reducer(state, { type: REMOVE_SCHOOL })

  t.deepEqual(expected, actual)
})

test('it can add a job', async t => {
  const state = { jobCount: 1, jobDuties: [1] }
  const expected = { jobCount: 2, jobDuties: [1, 1] }
  const actual = reducer(state, { type: ADD_JOB })

  t.deepEqual(expected, actual)
})

test('it can remove a job', async t => {
  const state = { jobCount: 3, jobDuties: [1, 1, 1] }
  const expected = { jobCount: 2, jobDuties: [1, 1] }
  const actual = reducer(state, { type: REMOVE_JOB })

  t.deepEqual(expected, actual)
})

test('it can add a job duty', async t => {
  const state = { jobCount: 2, jobDuties: [1, 1] }
  const expected = { jobCount: 2, jobDuties: [1, 2] }
  const actual = reducer(state, { type: INCREMENT_JOB_DUTY, index: 1 })

  t.deepEqual(expected, actual)
})

test('it can remove a job duty', async t => {
  const state = { jobCount: 2, jobDuties: [2, 4] }
  const expected = { jobCount: 2, jobDuties: [1, 4] }
  const actual = reducer(state, { type: DECREMENT_JOB_DUTY, index: 0 })

  t.deepEqual(expected, actual)
})

test('it can add a skill', async t => {
  const state = { skillCount: 0 }
  const expected = { skillCount: 1 }
  const actual = reducer(state, { type: ADD_SKILL })

  t.deepEqual(expected, actual)
})

test('it can remove a skill', async t => {
  const state = { skillCount: 2 }
  const expected = { skillCount: 1 }
  const actual = reducer(state, { type: REMOVE_SKILL })

  t.deepEqual(expected, actual)
})

test('it can add a project', async t => {
  const state = { projectCount: 0 }
  const expected = { projectCount: 1 }
  const actual = reducer(state, { type: ADD_PROJECT })

  t.deepEqual(expected, actual)
})

test('it can remove a project', async t => {
  const state = { projectCount: 2 }
  const expected = { projectCount: 1 }
  const actual = reducer(state, { type: REMOVE_PROJECT })

  t.deepEqual(expected, actual)
})

test('it can add an award', async t => {
  const state = { awardCount: 5 }
  const expected = { awardCount: 6 }
  const actual = reducer(state, { type: ADD_AWARD })

  t.deepEqual(expected, actual)
})

test('it can remove an award', async t => {
  const state = { awardCount: 4 }
  const expected = { awardCount: 3 }
  const actual = reducer(state, { type: REMOVE_AWARD })

  t.deepEqual(expected, actual)
})

test('it can update the section navigation', async t => {
  const state = {
    section: {
      prev: 'profile',
      curr: 'education',
      next: 'experience'
    }
  }

  const expected = {
    section: {
      prev: 'education',
      curr: 'experience',
      next: 'skills'
    }
  }

  const actual = reducer(state, {
    type: SET_SECTION_NAVIGATION,
    prev: 'education',
    curr: 'experience',
    next: 'skills'
  })

  t.deepEqual(expected, actual)
})
