/**
 * @flow
 */

import styled from 'styled-components'
import { colors } from '../../common/theme'

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid;
  border-color: ${colors.primary};
  border-radius: 2px;
  background: transparent;
  color: ${colors.primary};
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: none;
  transition: all 0.4s ease;
  user-select: none;

  &:hover {
    background: ${colors.primary};
    color: ${colors.background};
    cursor: pointer;
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
