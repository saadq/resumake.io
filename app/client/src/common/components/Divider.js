/**
 * @flow
 */

import styled from 'styled-components'
import { colors } from '../../common/theme'

const Divider = styled.hr`
  height: 10px;
  margin-left: 0;
  margin-right: 0;
  margin-top: 35px;
  border: none;
  background: ${colors.primary};
  opacity: 0.75;

  @media screen and (max-width: 850px) {
    width: 100%;
  }
`

export default Divider
