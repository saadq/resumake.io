import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { FormSection } from 'common/components/FormSection'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { Button } from 'common/components/Button'
import { BulletsSubsection } from './BulletsSubsection'
import { formActions } from '../../../slice'
import { emptyBulletsSubsection } from '../../../values'
import { useFormValues } from '../../../hooks/useFormValues'
import { BulletsSection as BulletsSectionType } from '../../../types/sections'
import { BulletsSubsection as BulletsSubsectionType } from '../../../types/form'

interface Props {
  sectionInfo: BulletsSectionType
}

export function BulletsSection({ sectionInfo }: Props) {
  const bulletsSection: Array<BulletsSubsectionType> = useFormValues()[
    sectionInfo.name
  ]

  const dispatch = useDispatch()

  const addBulletsSubsection = () => {
    dispatch(
      formActions.addSubsection({
        sectionName: sectionInfo.name,
        emptyFields: { ...emptyBulletsSubsection }
      })
    )
  }

  const removeBulletsSubsection = (indexToRemove: number) => {
    return () => {
      dispatch(
        formActions.removeSubsection({
          sectionName: sectionInfo.name,
          indexToRemove
        })
      )
    }
  }

  const addBullet = (subsectionIndex: number) => {
    dispatch(
      formActions.addSubsectionKeyword({
        sectionName: sectionInfo.name,
        keywordsName: 'bullets',
        sectionIndex: subsectionIndex
      })
    )
  }

  const removeBullet = (subsectionIndex: number, bulletIndex: number) => {
    dispatch(
      formActions.removeSubsectionKeyword({
        sectionName: sectionInfo.name,
        keywordsName: 'bullets',
        sectionIndex: subsectionIndex,
        keywordIndexToRemove: bulletIndex
      })
    )
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
    <FormSection title={sectionInfo.displayName}>
      <DraggableList onDragEnd={onDragEnd}>
        {bulletsSection.map((subsection, i) => (
          <DraggableItem
            key={`draggable-bullets-${sectionInfo.name}`}
            index={i}
          >
            <BulletsSubsection
              namePrefix={sectionInfo.name}
              subsection={subsection}
              removeBulletsSubsection={removeBulletsSubsection(i)}
              addBullet={addBullet}
              removeBullet={removeBullet}
              subsectionIndex={i}
              key={`bullet{i}`}
            />
          </DraggableItem>
        ))}
      </DraggableList>
      <Button
        type="button"
        onClick={addBulletsSubsection}
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
