/**
 * @flow
 */

import styled from 'styled-components'
import { colors } from '../../common/theme'
import { lighten, darken } from 'polished'

const Button = styled.button`
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid;
  border-color: ${colors.primary};
  border-radius: 2px;
  background: transparent;
  color: ${colors.primary};
  margin-right: 10px;
  margin-top: 10px;
  outline: none;
  transition: all 0.4s ease;
  user-select: none;

  &:focus:not(:hover) {
    background-color: ${darken(0.4, colors.primary)};
    border-color: ${lighten(0.2, colors.primary)};
    color: ${lighten(0.2, colors.primary)};
  }

  &:hover {
    background: ${colors.primary};
    color: ${colors.background};
    cursor: pointer;

    @media screen and (max-width: 850px) {
      background: transparent;
      color: ${colors.primary};
    }
  }

  i {
    color: ${colors.primary};
  }

  &:disabled {
    border-color: #444;
    color: #444;

    &:hover {
      background: ${colors.background};
      border-color: #444;
      color: #444;
      cursor: not-allowed;
    }

    i {
      color: #444;
    }

    &:active {
      position: initial;
    }
  }
`

export default Button
