import { FormState } from './form'
import { SettingsState } from './settings'

export interface AppState {
  form: FormState
  settings: SettingsState
}
