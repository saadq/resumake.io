import test from 'ava'
import reducer from '../../reducers/generator'
import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RESUME_SUCCESS,
  RESUME_FAILURE,
  SAVE_RESUME_DATA,
  REQUEST_SOURCE,
  DOWNLOAD_SOURCE_SUCCESS,
  DOWNLOAD_SOURCE_FAILURE,
  SET_PAGE_COUNT,
  SET_PAGE,
  PREV_PAGE,
  NEXT_PAGE
} from '../../constants'

test('it can select a template', async t => {
  const state = { template: 1 }
  const expected = { template: 7 }
  const actual = reducer(state, { type: SELECT_TEMPLATE, templateId: 7 })

  t.deepEqual(expected, actual)
})

test('it can request resume generation', async t => {
  const state = {}
  const expected = { status: 'pending' }
  const actual = reducer(state, { type: REQUEST_RESUME })

  t.deepEqual(expected, actual)
})

test('it can receive a generated resume', async t => {
  const state = {}

  const expected = {
    status: 'success',
    pdf: {
      url: 'blob:http://localhost:3000/some-resume-id'
    }
  }

  const actual = reducer(state, {
    type: RESUME_SUCCESS,
    url: 'blob:http://localhost:3000/some-resume-id'
  })

  t.deepEqual(expected, actual)
})

test('it can fail at generating a resume', async t => {
  const state = { status: 'pending' }
  const expected = { status: 'failure' }
  const actual = reducer(state, { type: RESUME_FAILURE })

  t.deepEqual(expected, actual)
})

test('it can save the current resume data', async t => {
  const resumeData = {
    profile: {
      fullName: 'Saad Quadri',
      email: 'saad@saadq.com'
    }
  }

  const state = {}
  const expected = { resumeData }
  const actual = reducer(state, { type: SAVE_RESUME_DATA, payload: resumeData })

  t.deepEqual(expected, actual)
})

test('it can request to download the resume source', async t => {
  const state = { isDownloading: false }
  const expected = { isDownloading: true }
  const actual = reducer(state, { type: REQUEST_SOURCE })

  t.deepEqual(expected, actual)
})

test('it can succeed or fail at downloading the resume source', async t => {
  const state = { isDownloading: true }
  const expected = { isDownloading: false }

  t.deepEqual(reducer(state, { type: DOWNLOAD_SOURCE_SUCCESS }), expected)
  t.deepEqual(reducer(state, { type: DOWNLOAD_SOURCE_FAILURE }), expected)
})

test('it can set the page count for the pdf', async t => {
  const state = {
    pdf: {}
  }

  const expected = {
    pdf: {
      pageCount: 2
    }
  }

  const actual = reducer(state, { type: SET_PAGE_COUNT, pageCount: 2 })

  t.deepEqual(expected, actual)
})

test('it can change the current page displayed of the pdf', async t => {
  const state = {
    pdf: {
      page: 2,
      pageCount: 3
    }
  }

  const expectedPrev = {
    pdf: {
      page: 1,
      pageCount: 3
    }
  }

  const expectedNext = {
    pdf: {
      page: 3,
      pageCount: 3
    }
  }

  const expectedSet = {
    pdf: {
      page: 2,
      pageCount: 3
    }
  }

  t.deepEqual(reducer(state, { type: PREV_PAGE }), expectedPrev)
  t.deepEqual(reducer(state, { type: NEXT_PAGE }), expectedNext)
  t.deepEqual(reducer(state, { type: SET_PAGE, page: 2 }), expectedSet)
})
