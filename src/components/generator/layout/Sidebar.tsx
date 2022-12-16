import Link from 'next/link'
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

  a {
    text-decoration: none;
    font-weight: 300;
    color: ${colors.foreground};
    list-style: none;
    display: inline-block;
    position: relative;
  }
`

export function Sidebar() {
  return (
    <Aside>
      <Nav>
        <Link href="/generator?section=templates"><a>Templates</a></Link>
        <Link href="/generator?section=basics"><a>Profile</a></Link>
        <Link href="/generator?section=education"><a>Education</a></Link>
        <Link href="/generator?section=work"><a>Work Experience</a></Link>
        <Link href="/generator?section=skills"><a>Skills</a></Link>
        <Link href="/generator?section=projects"><a>Projects</a></Link>
        <Link href="/generator?section=awards"><a>Awards</a></Link>
      </Nav>
    </Aside>
  )
}
