import React from 'react'
import {
  AiOutlineUnorderedList as BulletListIcon,
  AiOutlineTable as TableIcon,
  AiOutlineAlignLeft as ParagraphIcon
} from 'react-icons/ai'
import styled from 'styled-components'
import { Card } from 'common/components/Card'
import { Label } from 'common/components/Label'
import { ToggleButton } from './ToggleButton'

const Wrapper = styled.div`
  margin-top: 1.25em;
`

const ListLabel = Label.withComponent('span')

const handleClick = () => {
  console.log('click')
}

export function SectionTypeToggler() {
  return (
    <Wrapper>
      <ListLabel>Section Type</ListLabel>
      <Card
        flex
        flexDirection="row"
        justifyContent="space-around"
        background="#111314"
        padding="2em 1em"
      >
        <ToggleButton onClick={handleClick} active Icon={BulletListIcon}>
          Bullets
        </ToggleButton>
        <ToggleButton Icon={TableIcon}>Table</ToggleButton>
        <ToggleButton Icon={ParagraphIcon}>Paragraph</ToggleButton>
      </Card>
    </Wrapper>
  )
}
