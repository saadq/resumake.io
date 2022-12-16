import Link from 'next/link'
import styled from 'styled-components'

import { Logo } from '../../common/Logo'
import { colors } from '../../../theme'

const StyledHeader = styled.header`
  grid-area: header;
  width: 100%;
  height: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.borders};
`
export function Header() {
  return (
    <StyledHeader>
      <Link href="/">
        <a>
          <Logo scale={0.65} />
        </a>
      </Link>
    </StyledHeader>
  )
}
