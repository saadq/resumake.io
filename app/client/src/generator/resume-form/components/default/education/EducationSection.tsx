import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { School } from './School'
import { formActions } from '../../../slice'
import { emptySchool } from '../../../values'
import { useFormValues } from '../../../hooks/useFormValues'
import { useSectionInfo } from '../../../hooks/useSectionInfo'
import { DefaultSectionNames } from '../../../types/sections'

export function EducationSection() {
  const { education } = useFormValues()
  const [educationSection, educationSectionIndex] = useSectionInfo('education')
  const dispatch = useDispatch()

  const addSchool = () => {
    dispatch(
      formActions.addSubsection({
        sectionName: 'education',
        emptyFields: { ...emptySchool }
      })
    )
  }

  const removeSchool = (indexToRemove: number) => {
    return () => {
      dispatch(
        formActions.removeSubsection({
          sectionName: 'education',
          indexToRemove
        })
      )
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const sectionName: DefaultSectionNames = 'education'
    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(
      formActions.swapSubsectionsOrder({ sectionName, startIndex, endIndex })
    )
  }

  return (
    <FormSection
      title={educationSection?.displayName || 'Education'}
      inputName={`sections[${educationSectionIndex}].displayName`}
    >
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
