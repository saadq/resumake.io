import { combineReducers } from 'redux'
import form from './form'
import ui from './ui'
import resume from './resume'

const reducer = combineReducers({
  form,
  ui,
  resume
})

export default reducer
