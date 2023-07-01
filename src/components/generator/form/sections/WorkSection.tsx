import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import {MdClose, MdArrowUpward, MdArrowDownward} from 'react-icons/md'
import { FormSection } from './FormSection'
import { LabeledInput } from '../../../core/LabeledInput'
import { Input } from '../../../core/Input'
import { AddButton, IconButton } from '../../../core/Button'

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
              <MdArrowUpward />
            </IconButton>
            <IconButton type="button" onClick={() => swap(i + 1, i)}>
              <MdArrowDownward />
            </IconButton>
            <IconButton type="button" onClick={() => remove(i)}>
              <MdClose />
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
          <Highlights workIndex={index} />
        </Fragment>
      ))}
      <AddButton type="button" onClick={() => append({})}>
        + Add Work Experience
      </AddButton>
    </FormSection>
  )
}
