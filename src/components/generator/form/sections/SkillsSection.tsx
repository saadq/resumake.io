import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { MdClose, MdDragIndicator } from 'react-icons/md'
import { FormSection } from './FormSection'
import { LabeledInput } from '../../../core/LabeledInput'
import { Input } from '../../../core/Input'
import { AddButton, IconButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'

interface KeywordsProps {
  skillIndex: number
}

function Keywords({ skillIndex }: KeywordsProps) {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skillIndex}.keywords`
  })

  return (
    <>
      <label>Skill Details</label>
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
              name={`skills.${skillIndex}.keywords.${i}`}
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

export function SkillsSection() {
  const { fields, append } = useFieldArray({
    name: 'skills'
  })

  return (
    <FormSection title="Your Skills">
      <LabeledInput
        name="headings.skills"
        label="Section Heading"
        placeholder="Skills"
      />
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Divider />
          <LabeledInput
            name={`skills.${index}.name`}
            label="Skill name"
            placeholder="Programming Languages"
          />
          <Keywords skillIndex={index} />
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Skill
      </AddButton>
    </FormSection>
  )
}
