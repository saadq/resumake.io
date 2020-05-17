import React from 'react'
import { useDispatch } from 'react-redux'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { Award } from './Award'
import { formActions } from '../../slice'
import { useFormValues } from '../../hooks/useFormValues'

export function AwardsSection() {
  const { awards } = useFormValues()
  const dispatch = useDispatch()

  const addAward = () => {
    dispatch(formActions.addAward())
  }

  const removeAward = (index: number) => {
    return () => {
      dispatch(formActions.removeAward(index))
    }
  }

  return (
    <FormSection title="Awards">
      {awards.map((award, i) => (
        <Award
          award={award}
          removeAward={removeAward(i)}
          index={i}
          key={`award${i}`}
        />
      ))}
      <Button
        type="button"
        onClick={addAward}
        marginTop="2em"
        marginLeft="auto"
        marginRight="auto"
        width="45%"
      >
        Add Award
      </Button>
    </FormSection>
  )
}
