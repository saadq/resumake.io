import React from 'react'
import { useDispatch } from 'react-redux'
import {
  AiOutlineUnorderedList as BulletListIcon,
  AiOutlineTable as TableIcon,
  AiOutlineAlignLeft as ParagraphIcon
} from 'react-icons/ai'
import { LabeledCard } from 'common/components/LabeledCard'
import { ToggleButton } from './ToggleButton'
import { formActions } from '../../../slice'
import { CustomSection, CustomSectionTypes } from '../../../types/sections'

interface Props {
  sectionInfo: CustomSection
}

export function SectionTypeToggler({ sectionInfo }: Props) {
  const dispatch = useDispatch()

  const setSectionType = (sectionType: CustomSectionTypes) => {
    dispatch(
      formActions.setCustomSectionType({
        sectionName: sectionInfo.name,
        sectionType
      })
    )
  }

  return (
    <LabeledCard label="Section Type">
      <ToggleButton
        onClick={() => setSectionType('bullets')}
        Icon={BulletListIcon}
        active={sectionInfo.type === 'bullets'}
      >
        Bullets
      </ToggleButton>
      <ToggleButton
        onClick={() => setSectionType('table')}
        Icon={TableIcon}
        active={sectionInfo.type === 'table'}
      >
        Table
      </ToggleButton>
      <ToggleButton
        onClick={() => setSectionType('paragraph')}
        Icon={ParagraphIcon}
        active={sectionInfo.type === 'paragraph'}
      >
        Paragraph
      </ToggleButton>
    </LabeledCard>
  )
}
