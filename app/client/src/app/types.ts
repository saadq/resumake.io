import { ThunkAction } from 'redux-thunk'
import { FormState } from 'generator/resume-form/types'
import { rootReducer } from './rootReducer'

type ReduxState = ReturnType<typeof rootReducer>

export interface AppState extends Omit<ReduxState, 'form'> {
  form: FormState
}
