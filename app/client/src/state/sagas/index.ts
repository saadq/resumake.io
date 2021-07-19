import { all, fork } from 'redux-saga/effects'
import { formSaga } from './form'
import { settingsSaga } from './settings'

// prettier-ignore
export function* rootSaga() {
  yield all([
    fork(formSaga), 
    fork(settingsSaga)
  ])
}
