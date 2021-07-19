import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'
import { formActions } from '../slices/form'

function* generateResume() {
  try {
    yield delay(200)
    yield put(formActions.generateResumeSuccess())
  } catch (error) {
    yield put(formActions.generateResumeFailure())
  }
}

function* watchGenerateResume() {
  yield takeLatest(formActions.generateResume.type, generateResume)
}

// prettier-ignore
export function* formSaga() {
  yield all([
    fork(watchGenerateResume)
  ])
}
