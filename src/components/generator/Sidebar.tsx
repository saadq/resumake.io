import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MdDragIndicator } from 'react-icons/md'

import { colors } from '../../theme'
import { PrimaryButton, IconButton } from '../core/Button'

const Aside = styled.aside`
  grid-area: sidebar;
  border-right: 1px solid ${colors.borders};
  padding: 24px 36px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  margin-bottom: 28px;

  button {
    cursor: grab;
  }
`

const StyledLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  font-weight: 300;
  color: ${colors.foreground};

  ${(props) => props.$active && `color: ${colors.primary};`}
`

export function Sidebar() {
  const router = useRouter()
  const { section: currSection = 'basics' } = router.query

  const sectionLinks = [
    { label: 'Templates', section: 'templates' },
    { label: 'Profile', section: 'basics' },
    { label: 'Education', section: 'education' },
    { label: 'Work Experience', section: 'work' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', section: 'projects' },
    { label: 'Awards', section: 'awards' }
  ]

  return (
    <Aside>
      <Nav>
        {sectionLinks.map(({ label, section }) => (
          <div key={section} style={{ display: 'flex', gap: 8 }}>
            <IconButton type="button">
              <MdDragIndicator />
            </IconButton>
            <StyledLink
              href={`/generator?section=${section}`}
              $active={section === currSection}
            >
              {label}
            </StyledLink>
          </div>
        ))}
      </Nav>

      <PrimaryButton form="resume-form">MAKE</PrimaryButton>
    </Aside>
  )
}
