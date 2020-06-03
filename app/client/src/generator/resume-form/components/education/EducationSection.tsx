import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(formActions.swapSchoolsOrder({ startIndex, endIndex }))
  }

  return (
    <FormSection title="Education">
      <DraggableList onDragEnd={onDragEnd}>
        {education.map((school, i) => (
          <DraggableItem key={`draggable-school-${i}`} index={i}>
            <School
              removeSchool={removeSchool(i)}
              index={i}
              key={`school${i}`}
            />
          </DraggableItem>
        ))}
      </DraggableList>
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
