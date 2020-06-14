import React from 'react'
import { BulletsSection } from './bullets/BulletsSection'
import { TableSection } from './table/TableSection'
import { ParagraphSection } from './paragraph/ParagraphSection'
import { CustomSection as CustomSectionType } from '../../types/sections'
import { useSectionInfo } from '../../hooks/useSectionInfo'

interface Props {
  sectionInfo: CustomSectionType
}

export function CustomSection({ sectionInfo }: Props) {
  const [, index] = useSectionInfo(sectionInfo.name)

  switch (sectionInfo.type) {
    case 'bullets':
      return <BulletsSection sectionInfo={sectionInfo} sectionIndex={index} />
    case 'table':
      return <TableSection sectionInfo={sectionInfo} sectionIndex={index} />
    case 'paragraph':
      return <ParagraphSection sectionInfo={sectionInfo} sectionIndex={index} />
  }
}
