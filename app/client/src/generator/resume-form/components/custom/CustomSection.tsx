import React from 'react'
import { BulletsSection } from './bullets/BulletsSection'
import { TableSection } from './table/TableSection'
import { ParagraphSection } from './paragraph/ParagraphSection'
import { CustomSection as CustomSectionType } from '../../types/sections'

interface Props {
  sectionInfo: CustomSectionType
}

export function CustomSection({ sectionInfo }: Props) {
  switch (sectionInfo.type) {
    case 'bullets':
      return <BulletsSection sectionInfo={sectionInfo} />
    case 'table':
      return <TableSection sectionInfo={sectionInfo} />
    case 'paragraph':
      return <ParagraphSection sectionInfo={sectionInfo} />
  }
}
