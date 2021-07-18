import { useFieldArray } from 'react-hook-form'
import { FormSection } from '../../../common/FormSection'
import { Card } from '../../../common/Card'
import { LabeledInput } from '../../../common/LabeledInput'
import { FormValues } from '../../../../types/form'

export function EducationSection() {
  const { fields, append, remove } = useFieldArray<FormValues>({
    name: 'education'
  })

  return (
    <FormSection>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <LabeledInput
            name={`education.${index}.name`}
            label="School name"
            placeholder="Rutgers University"
          />
          <LabeledInput
            name={`education.${index}.degree`}
            label="Degree"
            placeholder="Bachelor's"
          />
          <LabeledInput
            name={`education.${index}.major`}
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
          <button onClick={() => remove(index)}>Remove</button>
        </Card>
      ))}
      <button onClick={() => append({})}>Add</button>
    </FormSection>
  )
}
