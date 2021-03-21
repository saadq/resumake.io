import { all, fork } from 'redux-saga/effects'
import { settingsSaga } from '../generator/settings/sagas'

export function* rootSaga() {
  // prettier-ignore
  yield all([
    fork(settingsSaga)
  ])
}
