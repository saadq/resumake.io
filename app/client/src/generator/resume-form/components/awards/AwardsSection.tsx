import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(formActions.swapAwardsOrder({ startIndex, endIndex }))
  }

  return (
    <FormSection title="Awards">
      <DraggableList onDragEnd={onDragEnd}>
        {awards.map((award, i) => (
          <DraggableItem key={`draggable-award-${i}`} index={i}>
            <Award removeAward={removeAward(i)} index={i} key={`award${i}`} />
          </DraggableItem>
        ))}
      </DraggableList>
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
