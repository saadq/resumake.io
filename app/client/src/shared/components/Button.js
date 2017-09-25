/**
 * @flow
 */

import styled from 'styled-components'
import { lighten } from 'polished'
import { darkBorder } from '../styles'

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid;
  border-color: ${props => props.inverted ? darkBorder : 'white'};
  border-radius: 2px;
  background: ${props => props.inverted ? 'white' : darkBorder};
  color: ${props => props.inverted ? darkBorder : 'white'};
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: none;

  &:hover {
    background: ${lighten(0.05, darkBorder)};
    color: ${props => props.inverted ? 'white' : darkBorder};
    cursor: pointer;
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:focus {
    border-color: ${darkBorder};
    outline-color: ${darkBorder};
  }
`

export default Button
