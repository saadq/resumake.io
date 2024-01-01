import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'

import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'
import { FormSection } from './FormSection'
import Highlights from '../Highlights'

export function WorkSection() {
  const { fields, append } = useFieldArray({ name: 'work' })

  return (
    <FormSection title="Your Work Experience">
      {fields.length > 0 && (
        <Fragment>
          <LabeledInput
            name="headings.work"
            label="Section Heading"
            placeholder="Work"
          />
          <Divider />
        </Fragment>
      )}
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <LabeledInput
            name={`work.${index}.company`}
            label="Company name"
            placeholder="Netflix"
          />
          <LabeledInput
            name={`work.${index}.position`}
            label="Position"
            placeholder="Software Engineer"
          />
          <LabeledInput
            name={`work.${index}.summary`}
            label="Summary"
            placeholder="lorem ipsum"
          />
          <LabeledInput
            name={`work.${index}.startDate`}
            label="Start Date"
            placeholder="Sep 2015"
          />
          <LabeledInput
            name={`work.${index}.endDate`}
            label="End Date"
            placeholder="Jun 2019"
          />
          <Highlights
            label="Job Responsibilities"
            placeholder="Did cool stuff at company"
            name={`work.${index}.highlights`}
          />
          <Divider />
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Work Experience
      </AddButton>
    </FormSection>
  )
}
