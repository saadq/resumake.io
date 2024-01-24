import Link from 'next/link'
import styled from 'styled-components'

import { Logo } from '../core/Logo'
import { colors } from '../../theme'

const StyledHeader = styled.header`
  grid-area: header;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.borders};
`
export function Header() {
  return (
    <StyledHeader>
      <Link href="/">
        <Logo scale={0.65} />
      </Link>
    </StyledHeader>
  )
}
