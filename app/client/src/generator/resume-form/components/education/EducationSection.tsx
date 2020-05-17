import React from 'react'
import { useDispatch } from 'react-redux'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { School } from './School'
import { formActions } from '../../slice'
import { useFormValues } from '../../hooks/useFormValues'

export function EducationSection() {
  const { education } = useFormValues()
  const dispatch = useDispatch()

  const addSchool = () => {
    dispatch(formActions.addSchool())
  }

  const removeSchool = (index: number) => {
    return () => {
      dispatch(formActions.removeSchool(index))
    }
  }

  return (
    <FormSection title="Education">
      {education.map((school, i) => (
        <School
          school={school}
          removeSchool={removeSchool(i)}
          index={i}
          key={`school${i}`}
        />
      ))}
      <Button
        type="button"
        onClick={addSchool}
        marginTop="2em"
        marginLeft="auto"
        marginRight="auto"
        width="45%"
      >
        Add School
      </Button>
    </FormSection>
  )
}
