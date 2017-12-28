/**
 * @flow
 */

import styled from 'styled-components'
import { lighten, rgba } from 'polished'
import { colors, animations } from '../../../common/theme'

const Button = styled.button`
  width: 75px;
  height: 75px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  border: 3px solid ${colors.primary};
  border-radius: 50%;
  box-shadow: 0 0 0 0 ${rgba(colors.primary, 0.7)};
  color: ${colors.primary};
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${animations.pulse} 1.5s infinite cubic-bezier(0.66, 0, 0, 1);

  &:hover {
    animation: none;
    cursor: pointer;
    background: ${colors.primary};
    color: black;
    border: 20px solid ${colors.primary};
  }

  &:active {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 40px rgba(0, 0, 0, 0.16);
    background-color: ${lighten(0.25, colors.primary)};
    border-color: ${lighten(0.25, colors.primary)};
    color: black;
  }

  &:focus {
    outline: none;
  }
`

export default Button
