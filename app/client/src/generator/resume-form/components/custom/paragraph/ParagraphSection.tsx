import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { FormSection } from 'common/components/FormSection'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { Button } from 'common/components/Button'
import { capitalize } from 'common/utils/strings'
import { ParagraphSubsection } from './ParagraphSubsection'
import { SectionTypeToggler } from '../toggler/SectionTypeToggler'
import { formActions } from '../../../slice'
import { emptyParagraphSubsection } from '../../../values'
import { useFormValues } from '../../../hooks/useFormValues'
import { ParagraphSection as ParagraphSectionType } from '../../../types/sections'
import { ParagraphSubsection as ParagraphSubsectionType } from '../../../types/form'

interface Props {
  sectionInfo: ParagraphSectionType
  sectionIndex: number
}

export function ParagraphSection({ sectionInfo, sectionIndex }: Props) {
  const paragraphSection: Array<ParagraphSubsectionType> = useFormValues()[
    sectionInfo.name
  ]
  const dispatch = useDispatch()

  const addParagraphSubsection = () => {
    dispatch(
      formActions.addSubsection({
        sectionName: sectionInfo.name,
        emptyFields: { ...emptyParagraphSubsection }
      })
    )
  }

  const removeParagraphSubsection = (indexToRemove: number) => {
    return () => {
      dispatch(
        formActions.removeSubsection({
          sectionName: sectionInfo.name,
          indexToRemove
        })
      )
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(
      formActions.swapSubsectionsOrder({
        sectionName: sectionInfo.name,
        startIndex,
        endIndex
      })
    )
  }

  return (
    <FormSection
      title={sectionInfo.displayName ?? capitalize(sectionInfo.name)}
      inputName={`sections[${sectionIndex}].displayName`}
    >
      <SectionTypeToggler sectionInfo={sectionInfo} />
      <DraggableList onDragEnd={onDragEnd}>
        {paragraphSection.map((subsection, i) => (
          <DraggableItem
            key={`draggable-bullets-${sectionInfo.name}-${i}`}
            index={i}
          >
            <ParagraphSubsection
              namePrefix={sectionInfo.name}
              subsectionIndex={i}
              removeParagraphSubsection={removeParagraphSubsection(i)}
              key={`bullet{i}`}
            />
          </DraggableItem>
        ))}
      </DraggableList>
      <Button
        type="button"
        onClick={addParagraphSubsection}
        marginTop="2em"
        marginLeft="auto"
        marginRight="auto"
        width="45%"
      >
        Add Subsection
      </Button>
    </FormSection>
  )
}
