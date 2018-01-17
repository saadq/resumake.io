/**
 * @flow
 */

import Button from './Button'
import { colors } from '../theme'

const RoundButton = Button.extend`
  display: flex;
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0px;
  background: ${colors.background};

  i {
    transition: all 0.4s ease;
  }

  &:disabled {
    &:hover {
      background: ${colors.background};
      border-color: #444;
      color: #444;
      cursor: default;
    }
  }

  &:hover {
    color: ${colors.background};

    i {
      color: ${colors.background};
    }
  }

  &:focus {
    outline-color: ${colors.primary};
    border-color: ${colors.primary};
  }
`

export default RoundButton
