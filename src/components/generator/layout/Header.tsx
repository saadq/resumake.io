import styled from 'styled-components'
import { sizes, colors } from '../../../theme'

const StyledHeader = styled.header`
  grid-area: header;
  width: 100%;
  height: ${sizes.header.height};
  background: ${colors.header};
  display: flex;
  justify-content: center;
  align-items: center;
`
export function Header() {
  return (
    <StyledHeader>
      Resumake
    </StyledHeader>
  )
}
