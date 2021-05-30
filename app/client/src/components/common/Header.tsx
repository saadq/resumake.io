import styled from 'styled-components'
import { sizes, colors } from '../../theme'

export const Header = styled.header`
  height: ${sizes.header.height};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid black;
  background: ${colors.gray2};
  display: flex;
  justify-content: center;
  align-items: center;
`
