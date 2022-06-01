import { darken } from 'polished'
import styled from 'styled-components'
import { colors } from '../../theme'

interface Props {
  margin?: string
}

export const RoundButton = styled.button<Props>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  background: ${colors.primary};
  color: ${colors.black};
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s transform;
  margin: ${(props) => props.margin};
  outline-color: ${colors.primary};
  &:hover {
    background: ${darken(0.1, colors.primary)};
    transform: rotate(90deg);
  }
`
