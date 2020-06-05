import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { FormSection } from 'common/components/FormSection'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { Button } from 'common/components/Button'
import { RadioButtonList } from 'common/components/RadioButtonList'
import { TableSubsection } from './TableSubsection'
import { formActions } from '../../../slice'
import { emptyTableSubsection } from '../../../values'
import { useFormValues } from '../../../hooks/useFormValues'
import { TableSection as TableSectionType } from '../../../types/sections'
import { TableSubsection as TableSubsectionType } from '../../../types/form'

interface Props {
  sectionInfo: TableSectionType
}

export function TableSection({ sectionInfo }: Props) {
  const tableSection: Array<TableSubsectionType> = useFormValues()[
    sectionInfo.name
  ]

  const dispatch = useDispatch()

  const addTableSubsection = () => {
    dispatch(
      formActions.addSubsection({
        sectionName: sectionInfo.name,
        emptyFields: { ...emptyTableSubsection }
      })
    )
  }

  const removeTableSubsection = (indexToRemove: number) => {
    return () => {
      dispatch(
        formActions.removeSubsection({
          sectionName: sectionInfo.name,
          indexToRemove
        })
      )
    }
  }

  const addTableEntry = (subsectionIndex: number) => {
    dispatch(
      formActions.addSubsectionKeyword({
        sectionName: sectionInfo.name,
        keywordsName: 'keywords',
        sectionIndex: subsectionIndex
      })
    )
  }

  const removeTableEntry = (
    subsectionIndex: number,
    tableEntryIndex: number
  ) => {
    dispatch(
      formActions.removeSubsectionKeyword({
        sectionName: sectionInfo.name,
        keywordsName: 'keywords',
        sectionIndex: subsectionIndex,
        keywordIndexToRemove: tableEntryIndex
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
      <RadioButtonList
        name={`${sectionInfo.name}.type`}
        items={[
          { value: 'bullets', label: 'Bullets' },
          { value: 'table', label: 'Table' },
          { value: 'paragraph', label: 'Paragraph' }
        ]}
      />
      <DraggableList onDragEnd={onDragEnd}>
        {tableSection.map((subsection, i) => (
          <DraggableItem key={`draggable-table-${sectionInfo.name}`} index={i}>
            <TableSubsection
              namePrefix={sectionInfo.name}
              subsection={subsection}
              removeTableSubsection={removeTableSubsection(i)}
              addTableEntry={addTableEntry}
              removeTableEntry={removeTableEntry}
              subsectionIndex={i}
              key={`tableEntry{i}`}
            />
          </DraggableItem>
        ))}
      </DraggableList>
      <Button
        type="button"
        onClick={addTableSubsection}
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
