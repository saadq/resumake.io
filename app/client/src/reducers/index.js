import { combineReducers } from 'redux'
import form from './form'
import ui from './ui'
import generator from './generator'

const reducer = combineReducers({
  form,
  ui,
  generator
})

export default reducer
