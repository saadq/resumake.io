
import { useFieldArray } from 'react-hook-form'
import { FormSection } from './FormSection'
import { Card } from '../../../common/Card'
import { LabeledInput } from '../inputs/LabeledInput'
import { AddButton } from '../../../common/Button'

export function SkillsSection() {
  const { fields, append, remove, swap } = useFieldArray({
    name: 'skills'
  })

  return (
    <FormSection title="Your Work Experience">
      {fields.map((field, index) => (
        <Card
          key={field.id}
          showControls
          removeCard={() => remove(index)}
          moveUp={index >= 1 ? () => swap(index - 1, index) : undefined}
          moveDown={
            index < fields.length - 1 ? () => swap(index + 1, index) : undefined
          }
        >
          <LabeledInput
            name={`skills.${index}.name`}
            label="Skill name"
            placeholder="Programming Languages"
          />
        </Card>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Skill
      </AddButton>
    </FormSection>
  )
}
