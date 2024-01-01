import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'

import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'
import { FormSection } from './FormSection'
import Keywords from './Keywords'

import { Project } from '../../../../types'

export function ProjectsSection() {
  const { fields, append } = useFieldArray({ name: 'projects' })

  const handleAdd = () => {
    const defaultProject: Project = {
      name: '',
      description: '',
      url: '',
      keywords: []
    }

    append(defaultProject)
  }

  return (
    <FormSection title="Your Projects">
      {fields.length > 0 && (
        <Fragment>
          <LabeledInput
            name="headings.projects"
            label="Section Heading"
            placeholder="Projects"
          />
          <Divider />
        </Fragment>
      )}
      {fields.map((field, index) => (
        <Fragment key={field.id}>
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
          <Divider />
        </Fragment>
      ))}
      <AddButton type="button" onClick={handleAdd}>
        + Add Project
      </AddButton>
    </FormSection>
  )
}
