/**
 * @flow
 */

import styled from 'styled-components'
import { darken } from 'polished'
import { colors } from '../../common/theme'

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid;
  border-color: ${props => (props.inverted ? colors.borders : 'white')};
  border-radius: 2px;
  background: ${props => (props.inverted ? 'white' : colors.background)};
  color: ${props => (props.inverted ? colors.borders : 'white')};
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: none;

  &:hover {
    background: ${darken(0.1, colors.background)};
    cursor: pointer;
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:disabled {
    border-color: #444;
    color: #444;

    &:hover {
      background: ${colors.background};
      border-color: #444;
      color: #444;
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
