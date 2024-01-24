import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'

import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'
import { FormSection } from './FormSection'
import Keywords from '../Keywords'

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
          <LabeledInput
            name={`projects.${index}.description`}
            label="Project Description"
            placeholder="A video chat app with great picture quality."
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
