import { useFormContext, Controller } from 'react-hook-form'

import { FormSection } from './FormSection'
import { TEMPLATES } from '../../../../lib/templates/constants'

import { FormValues } from '../../../../types'

export function TemplatesSection() {
  const { control } = useFormContext<FormValues>()

  return (
    <FormSection title="Choose a Template">
      {TEMPLATES.map((templateId) => (
        <label key={templateId} style={{ display: 'inline-block', padding: 8 }}>
          Template {templateId}
          <Controller
            control={control}
            name="selectedTemplate"
            render={({ field }) => (
              <input
                type="radio"
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={templateId}
                checked={field.value === templateId}
              />
            )}
          />
        </label>
      ))}
    </FormSection>
  )
}
