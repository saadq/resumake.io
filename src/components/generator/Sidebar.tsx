import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MdDragIndicator } from 'react-icons/md'
import DragSort from 'react-dragged'

import { colors } from '../../theme'
import { PrimaryButton, IconButton } from '../core/Button'
import { useState } from 'react'

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

const staticSectionLinks = [
  { label: 'Templates', section: 'templates' },
  { label: 'Profile', section: 'basics' }
]

const sortableSectionLinks = [
  { label: 'Education', section: 'education' },
  { label: 'Work Experience', section: 'work' },
  { label: 'Skills', section: 'skills' },
  { label: 'Projects', section: 'projects' },
  { label: 'Awards', section: 'awards' }
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
    <DragIconButton type="button" disabled={!Boolean(draggable)}>
      <MdDragIndicator />
    </DragIconButton>
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
  const [sections, updateSectionOrder] = useState(sortableSectionLinks)

  return (
    <Aside>
      <NavList>
        <div>
          {staticSectionLinks.map(({ label, section }) => (
            <NavItem
              key={section}
              label={label}
              section={section}
              currSection={currSection}
            />
          ))}
        </div>
        <DragSort
          items={sections}
          onChange={(params) => updateSectionOrder(params)}
          renderItem={({ label, section }) => {
            return (
              <NavItem
                draggable
                key={section}
                label={label}
                section={section}
                currSection={currSection}
              />
            )
          }}
        />
      </NavList>
      <PrimaryButton form="resume-form">MAKE</PrimaryButton>
    </Aside>
  )
}
