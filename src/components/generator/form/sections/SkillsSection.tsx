import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { FormSection } from './FormSection'
import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'

export function SkillsSection() {
  const { fields, append, remove, swap } = useFieldArray({
    name: 'skills'
  })

  return (
    <FormSection title="Your Work Experience">
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <LabeledInput
            name={`skills.${index}.name`}
            label="Skill name"
            placeholder="Programming Languages"
          />
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Skill
      </AddButton>
    </FormSection>
  )
}
