import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'

import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'
import { FormSection } from './FormSection'
import Keywords from '../Keywords'
import Highlights from '../Highlights'

export function ProjectsSection() {
  const { fields, append } = useFieldArray({ name: 'projects' })

  return (
    <FormSection title="Your Projects">
      <LabeledInput
        name="headings.projects"
        label="Section Heading"
        placeholder="Projects"
      />
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Divider />
          <LabeledInput
            name={`projects.${index}.name`}
            label="Project Name"
            placeholder="Piper Chat"
          />
          <Highlights
            label="Project Details"
            placeholder="Won CalHacks 2023"
            name={`projects.${index}.highlights`}
          />
          <LabeledInput
            name={`projects.${index}.url`}
            label="Link to Project"
            placeholder="http://piperchat.com"
          />
          <Keywords
            label="Tools Used"
            placeholder="TypeScript"
            name={`projects.${index}.keywords`}
          />
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Project
      </AddButton>
    </FormSection>
  )
}
