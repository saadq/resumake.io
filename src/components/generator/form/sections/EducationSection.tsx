import { useFieldArray } from 'react-hook-form'
import { FormSection } from './FormSection'
import { Card } from '../../../common/Card'
import { LabeledInput } from '../inputs/LabeledInput'
import { FormValues } from '../../../../types'

export function EducationSection() {
  const { fields, append, remove, swap } = useFieldArray<
    FormValues,
    'education'
  >({
    name: 'education'
  })

  return (
    <FormSection title="Your Educational Background">
      {fields.map((field, index) => (
        <Card
          key={field.id}
          removeCard={() => remove(index)}
          moveUp={index >= 1 ? () => swap(index - 1, index) : undefined}
          moveDown={
            index < fields.length - 1 ? () => swap(index + 1, index) : undefined
          }
        >
          <LabeledInput
            name={`education.${index}.institution`}
            label="School name"
            placeholder="Rutgers University"
          />
          <LabeledInput
            name={`education.${index}.studyType`}
            label="Degree"
            placeholder="Bachelor's"
          />
          <LabeledInput
            name={`education.${index}.area`}
            label="Major"
            placeholder="Computer Science"
          />
          <LabeledInput
            name={`education.${index}.startDate`}
            label="Start Date"
            placeholder="Sep 2015"
          />
          <LabeledInput
            name={`education.${index}.endDate`}
            label="End Date"
            placeholder="Jun 2019"
          />
        </Card>
      ))}
      <button type="button" onClick={() => append({})}>
        Add
      </button>
    </FormSection>
  )
}
