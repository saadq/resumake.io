import React from 'react'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { InputListWithLabel } from 'common/components/InputListWithLabel'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'
import { TableSubsection as TableSubsectionType } from '../../../types/form'

interface Props {
  subsection: TableSubsectionType
  namePrefix: string
  addTableEntry: (subsectionIndex: number) => void
  removeTableEntry: (subsectionIndex: number, tableEntryIndex: number) => void
  removeTableSubsection: () => void
  subsectionIndex: number
}

export function TableSubsection({
  subsection,
  namePrefix,
  addTableEntry,
  removeTableEntry,
  removeTableSubsection,
  subsectionIndex
}: Props) {
  return (
    <Card marginTop="1.5em">
      <InputWithLabel
        name={`${namePrefix}[${subsectionIndex}].name`}
        label="Category"
        placeholder="Programming Languages"
      />
      <InputListWithLabel
        namePrefix={`${namePrefix}[${subsectionIndex}].keywords`}
        label="Keywords"
        placeholder="JavaScript"
        list={subsection.keywords}
        addItem={() => addTableEntry(subsectionIndex)}
        removeItem={(tableEntryIndex: number) =>
          removeTableEntry(subsectionIndex, tableEntryIndex)
        }
      />
      <RemoveSubsectionButton type="button" onClick={removeTableSubsection}>
        X
      </RemoveSubsectionButton>
    </Card>
  )
}
