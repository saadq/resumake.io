import { template1 } from './templates/template1/template1'
import { FormValues } from './types'

export function generateTex(formValues: FormValues): string {
  return template1(formValues)
}
