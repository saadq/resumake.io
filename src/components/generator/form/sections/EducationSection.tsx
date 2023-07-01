import {Fragment} from 'react'
import { useFieldArray } from 'react-hook-form'
import { FormSection } from './FormSection'
import { LabeledInput } from '../inputs/LabeledInput'
import { AddButton } from '../../../common/Button'

export function EducationSection() {
  const { fields, append, remove, swap } = useFieldArray({ name: 'education' })

  return (
    <FormSection title="Your Educational Background">
      {fields.map((field, index) => (
        <Fragment key={field.id}>
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
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add School
      </AddButton>
    </FormSection>
  )
}
