/**
 * @flow
 */

import styled from 'styled-components'
import { lighten, darken, rgba } from 'polished'
import { colors } from '../../../common/theme'

const Button = styled.button`
  width: 125px;
  height: 45px;
  margin-top: 25px;
  background: linear-gradient(40deg, ${darken(0.3, colors.primary)}, ${colors.primary});
  color: white;
  border-radius: 100px;
  border: 1px solid ${darken(0.1, colors.primary)};
  box-shadow: 0 0 0 0 ${rgba(colors.primary, 0.7)};
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    background: linear-gradient(40deg, ${darken(0.4, colors.primary)}, ${colors.primary});
    animation: none;
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 40px rgba(0, 0, 0, 0.16);
    border-color: ${lighten(0.15, colors.primary)};
    color: ${lighten(0.15, colors.primary)};
  }

  &:focus {
    outline: none;
  }
`

export default Button
