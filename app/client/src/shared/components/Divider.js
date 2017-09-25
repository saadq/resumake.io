/**
 * @flow
 */

import styled from 'styled-components'

const Divider = styled.hr`
  height: 10px;
  width: 80%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 35px;
  padding-right: 10px;
  padding-left: 5px;
  border: none;
  background: #bbb;
  opacity: 0.75;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export default Divider
