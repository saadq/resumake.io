/**
 * @flow
 */

import styled from 'styled-components'
import { lighten } from 'polished'
import { primary } from '../styles'

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 2px;
  background: ${primary};
  color: white;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: none;

  &:hover {
    background: ${lighten(0.05, primary)};
    cursor: pointer;
  }

  &:active {
    position: relative;
    top: 1px;
  }

  &:focus {
    border-color: ${primary};
    outline-color: ${primary};
  }
`

export default Button
