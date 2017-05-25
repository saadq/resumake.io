import test from 'ava'
import { form as reducer } from '../../reducers/form'
import {
  CLEAR_SCHOOL_FIELD,
  CLEAR_JOB_FIELD,
  CLEAR_JOB_DUTY_FIELD,
  CLEAR_PROJECT_FIELD,
  CLEAR_SKILL_FIELD
} from '../../constants'

test('it should clear school field', async t => {
  const state = {
    values: {
      schools: [{ name: 'school1' }, { name: 'school2' }, { name: 'school3' }]
    }
  }

  const expected = {
    values: {
      schools: [{ name: 'school1' }, { name: 'school2' }]
    }
  }

  const actual = reducer(state, { type: CLEAR_SCHOOL_FIELD, schoolCount: 3 })

  t.deepEqual(expected, actual)
})

test('it should clear job field', async t => {
  const state = {
    values: {
      jobs: [{ name: 'job1' }, { name: 'job2' }]
    }
  }

  const expected = {
    values: {
      jobs: [{ name: 'job1' }]
    }
  }

  const actual = reducer(state, { type: CLEAR_JOB_FIELD, jobCount: 2 })

  t.deepEqual(expected, actual)
})

test('it should clear job duty field', async t => {
  const state = {
    values: {
      jobs: [
        { duties: ['duty1', 'duty2'] },
        { duties: ['duty1', 'duty2', 'duty3'] }
      ]
    }
  }

  const expected = {
    values: {
      jobs: [{ duties: ['duty1', 'duty2'] }, { duties: ['duty1', 'duty2'] }]
    }
  }

  const actual = reducer(state, {
    type: CLEAR_JOB_DUTY_FIELD,
    index: 1,
    jobDutyCount: 3
  })

  t.deepEqual(expected, actual)
})

test('it should clear project field', async t => {
  const state = {
    values: {
      projects: [
        { name: 'project1' },
        { name: 'project2' },
        { name: 'project3' },
        { name: 'project4' }
      ]
    }
  }

  const expected = {
    values: {
      projects: [
        { name: 'project1' },
        { name: 'project2' },
        { name: 'project3' }
      ]
    }
  }

  const actual = reducer(state, { type: CLEAR_PROJECT_FIELD, projectCount: 4 })

  t.deepEqual(expected, actual)
})

test('it should clear skill field', async t => {
  const state = {
    values: {
      skills: [{ name: 'skill1' }, { name: 'skill2' }]
    }
  }

  const expected = {
    values: {
      skills: [{ name: 'skill1' }]
    }
  }

  const actual = reducer(state, { type: CLEAR_SKILL_FIELD, skillCount: 2 })

  t.deepEqual(expected, actual)
})
