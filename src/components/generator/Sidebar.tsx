import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MdDragIndicator } from 'react-icons/md'
import arrayMove from 'array-move'
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort'

import { colors } from '../../theme'
import { PrimaryButton, IconButton } from '../core/Button'

const Aside = styled.aside`
  grid-area: sidebar;
  border-right: 1px solid ${colors.borders};
  padding: 24px 36px;
`

// div targets the items inside the drag sort library
const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  margin-bottom: 28px;

  > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 24px;
  }
`

const StyledLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  font-weight: 300;
  color: ${colors.foreground};

  ${(props) => props.$active && `color: ${colors.primary};`}
`

const DragIconButton = styled(IconButton)`
  opacity: ${(props) => (props.disabled ? 0 : 1)};
  cursor: ${(props) => (props.disabled ? 'default' : 'grab')};
`

const sections = [
  { label: 'Templates', section: 'templates', isSortble: false },
  { label: 'Profile', section: 'basics', isSortble: false },
  { label: 'Education', section: 'education', isSortble: true },
  { label: 'Work Experience', section: 'work', isSortble: true },
  { label: 'Skills', section: 'skills', isSortble: true },
  { label: 'Projects', section: 'projects', isSortble: true },
  { label: 'Awards', section: 'awards', isSortble: true }
]

const NavItem = ({
  label,
  section,
  currSection,
  draggable
}: {
  label: string
  section: string
  currSection: string
  draggable?: boolean
}) => (
  <div key={section} style={{ display: 'flex', gap: 8 }}>
    <SortableKnob>
      <DragIconButton type="button" disabled={!Boolean(draggable)}>
        <MdDragIndicator />
      </DragIconButton>
    </SortableKnob>
    <StyledLink
      href={`/generator?section=${section}`}
      $active={section === currSection}
    >
      {label}
    </StyledLink>
  </div>
)

export function Sidebar() {
  const router = useRouter()
  const currSection = (router.query.section || 'basics') as string
  const [sortedSections, updateSectionOrder] = useState(sections)

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    updateSectionOrder((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <Aside>
      <NavList>
        <SortableList lockAxis="y" onSortEnd={onSortEnd}>
          {sortedSections.map(({ label, section, isSortble }) => (
            <SortableItem key={section}>
              <div>
                <NavItem
                  draggable={isSortble}
                  key={section}
                  label={label}
                  section={section}
                  currSection={currSection}
                />
              </div>
            </SortableItem>
          ))}
        </SortableList>
      </NavList>
      <PrimaryButton form="resume-form">MAKE</PrimaryButton>
    </Aside>
  )
}
