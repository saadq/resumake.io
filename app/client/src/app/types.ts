import { FormState } from 'generator/resume-form/types/form'
import { rootReducer } from './rootReducer'

type ReduxState = ReturnType<typeof rootReducer>

export interface AppState extends Omit<ReduxState, 'form'> {
  form: FormState
}
