import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { FormSection } from './FormSection'
import { Card } from '../../../common/Card'
import { LabeledInput } from '../inputs/LabeledInput'
import { Input } from '../inputs/Input'
import { AddButton, IconButton } from '../../../common/Button'

interface HighlightProps {
  workIndex: number
}

function Highlights({ workIndex }: HighlightProps) {
  const { fields, append, remove, swap } = useFieldArray({
    name: `work.${workIndex}.highlights`
  })

  return (
    <>
      <label>Job Responsibilities</label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
          alignItems: 'center',
          gap: '8px',
          margin: '0.5rem 0'
        }}
      >
        {fields.map((field, i) => (
          <Fragment key={field.id}>
            <Input
              name={`work.${workIndex}.highlights.${i}`}
              placeholder="Did cool stuff at company"
            />
            <IconButton type="button" onClick={() => swap(i - 1, i)}>
              <span className="material-symbols-rounded">arrow_upward</span>
            </IconButton>
            <IconButton type="button" onClick={() => swap(i + 1, i)}>
              <span className="material-symbols-rounded">arrow_downward</span>
            </IconButton>
            <IconButton type="button" onClick={() => remove(i)}>
              <span className="material-symbols-rounded">delete</span>
            </IconButton>
          </Fragment>
        ))}
      </div>
      <button type="button" onClick={() => append('')}>
        + Add
      </button>
    </>
  )
}

export function WorkSection() {
  const { fields, append, remove, swap } = useFieldArray({
    name: 'work'
  })

  return (
    <FormSection title="Your Work Experience">
      {fields.map((field, index) => (
        <Card
          key={field.id}
          showControls
          removeCard={() => remove(index)}
          moveUp={index >= 1 ? () => swap(index - 1, index) : undefined}
          moveDown={
            index < fields.length - 1 ? () => swap(index + 1, index) : undefined
          }
        >
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
          <Highlights workIndex={index} />
        </Card>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Work Experience
      </AddButton>
    </FormSection>
  )
}
