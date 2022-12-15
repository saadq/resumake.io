import { useFieldArray } from 'react-hook-form'
import { FormSection } from './FormSection'
import { Card } from '../../../common/Card'
import { LabeledInput } from '../inputs/LabeledInput'
import { FormValues } from '../../../../types'

function Highlights({ index }: { index: number }) {
  // TODO: implement reordering
  const { fields } = useFieldArray({
    name: `work.${index}.highlights`
  })

  return (
    <div>
      {fields.map((field, index2 /* TODO: come up with better name */) => (
        <LabeledInput
          key={field.id}
          name={`work.${index}.highlights.${index2}`}
          label="lorem"
        />
      ))}
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
          <Highlights index={index} />
        </Card>
      ))}
      <button type="button" onClick={() => append({})}>
        Add
      </button>
    </FormSection>
  )
}
