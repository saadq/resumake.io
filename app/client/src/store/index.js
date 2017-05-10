import { createStore } from 'redux'
import middleware from './middleware'
import reducer from '../reducers'

const store = createStore(reducer, middleware)

export default store
