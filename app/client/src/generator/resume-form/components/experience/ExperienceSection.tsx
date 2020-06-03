import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { Job } from './Job'
import { formActions } from '../../slice'
import { useFormValues } from '../../hooks/useFormValues'

export function ExperienceSection() {
  const { work } = useFormValues()
  const dispatch = useDispatch()

  const addJob = () => {
    dispatch(formActions.addJob())
  }

  const removeJob = (index: number) => {
    return () => {
      dispatch(formActions.removeJob(index))
    }
  }

  const addJobHighlight = (jobIndex: number) => {
    dispatch(formActions.addJobHighlight(jobIndex))
  }

  const removeJobHighlight = (jobIndex: number, highlightIndex: number) => {
    dispatch(formActions.removeJobHighlight({ jobIndex, highlightIndex }))
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(formActions.swapJobsOrder({ startIndex, endIndex }))
  }

  return (
    <FormSection title="Experience">
      <DraggableList onDragEnd={onDragEnd}>
        {work.map((job, i) => (
          <DraggableItem key={`draggable-job-${i}`} index={i}>
            <Job
              job={job}
              removeJob={removeJob(i)}
              addJobHighlight={addJobHighlight}
              removeJobHighlight={removeJobHighlight}
              index={i}
              key={`job${i}`}
            />
          </DraggableItem>
        ))}
      </DraggableList>
      <Button
        type="button"
        onClick={addJob}
        marginTop="2em"
        marginLeft="auto"
        marginRight="auto"
        width="45%"
      >
        Add Job
      </Button>
    </FormSection>
  )
}
