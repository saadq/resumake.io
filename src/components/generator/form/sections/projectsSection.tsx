import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { MdClose, MdDragIndicator } from 'react-icons/md'
import { FormSection } from './FormSection'
import { LabeledInput } from '../../../core/LabeledInput'
import { Input } from '../../../core/Input'
import { AddButton, IconButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'

interface KeywordsProps {
  projectIndex: number
}

function Keywords({ projectIndex }: KeywordsProps) {
  const { fields, append, remove } = useFieldArray({
    name: `projects.${projectIndex}.keywords`
  })

  return (
    <>
      <label>Tools Used</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '4px',
          margin: '0.5rem 0'
        }}
      >
        {fields.map((field, i) => (
          <Fragment key={field.id}>
            <IconButton type="button">
              <MdDragIndicator />
            </IconButton>
            <Input
              name={`projects.${projectIndex}.keywords.${i}`}
              placeholder="TypeScript"
            />
            <IconButton type="button" onClick={() => remove(i)}>
              <MdClose />
            </IconButton>
          </Fragment>
        ))}
      </div>
      <AddButton type="button" onClick={() => append('')}>
        + Add
      </AddButton>
    </>
  )
}

export function ProjectsSection() {
  const { fields, append } = useFieldArray({
    name: 'projects'
  })

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
          <Keywords projectIndex={index} />
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Project
      </AddButton>
    </FormSection>
  )
}
