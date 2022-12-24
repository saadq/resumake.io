import { useFieldArray } from 'react-hook-form'
import { FormSection } from './FormSection'
import { Card } from '../../../common/Card'
import { LabeledInput } from '../inputs/LabeledInput'
import { Input } from '../inputs/Input'

interface HighlightProps {
  workIndex: number
}

function Highlights({ workIndex }: HighlightProps) {
  const { fields, append, remove, swap } = useFieldArray({
    name: `work.${workIndex}.highlights`
  })

  return (
    <div>
      <label>Job Responsibilities</label>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: 'flex' }}>
          <Input
            name={`work.${workIndex}.highlights.${index}`}
            placeholder="Did cool stuff at company"
          />
          <button onClick={() => remove(index)}>X</button>
          {index > 0 && (
            <button onClick={() => swap(index - 1, index)}>↑</button>
          )}
          {index < fields.length - 1 && (
            <button onClick={() => swap(index + 1, index)}>↓</button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => append('')}>
        Add
      </button>
    </div>
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
      <button type="button" onClick={() => append({})}>
        Add
      </button>
    </FormSection>
  )
}
