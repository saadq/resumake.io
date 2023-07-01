import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { colors } from '../../../theme'

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
  gap: 20px;
`

const StyledLink = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  font-weight: 300;
  color: ${colors.foreground};
  padding-bottom: 6px;

  ${(props) => props.active && `color: ${colors.primary};`}
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
          <StyledLink
            key={section} href={`/generator?section=${section}`}
            active={section === currSection}
          >
            {label}
          </StyledLink>
        ))}
      </Nav>
    </Aside>
  )
}
