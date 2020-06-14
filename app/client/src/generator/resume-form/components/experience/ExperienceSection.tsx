import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { Job } from './Job'
import { formActions } from '../../slice'
import { emptyJob } from '../../values'
import { useFormValues } from '../../hooks/useFormValues'
import { useSectionInfo } from '../../hooks/useSectionInfo'
import { DefaultSectionNames } from '../../types/sections'

export function ExperienceSection() {
  const { work } = useFormValues()
  const [workSection, workSectionIndex] = useSectionInfo('work')
  const dispatch = useDispatch()

  const addJob = () => {
    dispatch(
      formActions.addSubsection({
        sectionName: 'work',
        emptyFields: { ...emptyJob }
      })
    )
  }

  const removeJob = (indexToRemove: number) => {
    return () => {
      dispatch(
        formActions.removeSubsection({
          sectionName: 'work',
          indexToRemove
        })
      )
    }
  }

  const addJobHighlight = (jobIndex: number) => {
    dispatch(
      formActions.addSubsectionKeyword({
        sectionName: 'work',
        keywordsName: 'highlights',
        sectionIndex: jobIndex
      })
    )
  }

  const removeJobHighlight = (jobIndex: number, highlightIndex: number) => {
    dispatch(
      formActions.removeSubsectionKeyword({
        sectionName: 'work',
        keywordsName: 'highlights',
        sectionIndex: jobIndex,
        keywordIndexToRemove: highlightIndex
      })
    )
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const sectionName: DefaultSectionNames = 'work'
    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(
      formActions.swapSubsectionsOrder({ sectionName, startIndex, endIndex })
    )
  }

  return (
    <FormSection
      title={workSection?.displayName || 'Work'}
      inputName={`sections[${workSectionIndex}].displayName`}
    >
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
