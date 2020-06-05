import { useSelector } from 'react-redux'
import { AppState } from 'app/types'

export function useSections() {
  return useSelector((state: AppState) => state.form.resume.values.sections)
}
