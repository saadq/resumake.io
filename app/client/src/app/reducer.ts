import { combineReducers, Action } from 'redux'

export const rootReducer = combineReducers({
  placeholder: (state: number = 0, action: Action) => {
    return state
  }
})
