import { useFieldArray } from 'react-hook-form'
import { FormSection } from '../../../common/FormSection'
import { Card } from '../../../common/Card'
import { LabeledInput } from '../../../common/LabeledInput'

export function EducationSection() {
  const { fields, append, remove } = useFieldArray({
    name: 'education'
  })

  return (
    <FormSection title="Your Educational Background">
      {fields.map((field, index) => (
        <Card key={field.id} removeCard={() => remove(index)}>
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
