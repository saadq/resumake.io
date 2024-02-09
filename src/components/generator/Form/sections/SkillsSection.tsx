import { Fragment, useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'

import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'
import { FormSection } from './FormSection'
import Keywords from './Keywords'

import { Skill } from '../../../../types'
import { useDispatch } from 'react-redux'
import { setData } from '../../../../slice/DataSlice'

export function SkillsSection() {
  const { fields, append } = useFieldArray({ name: 'skills' })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setData(fields))
  }, [fields])

  const handleAdd = () => {
    const defaultSkill: Skill = {
      name: '',
      keywords: []
    }

    append(defaultSkill)
  }

  return (
    <FormSection title="Your Skills">
      {fields.length > 0 && (
        <Fragment>
          <LabeledInput
            name="headings.skills"
            label="Section Heading"
            placeholder="Skills"
          />
          <Divider />
        </Fragment>
      )}
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <LabeledInput
            name={`skills.${index}.name`}
            label="Skill name"
            placeholder="Programming Languages"
          />
          <Keywords
            label="Skill Details"
            placeholder="TypeScript"
            name={`skills.${index}.keywords`}
          />
          <Divider />
        </Fragment>
      ))}
      <AddButton type="button" onClick={handleAdd}>
        + Add Skill
      </AddButton>
    </FormSection>
  )
}
