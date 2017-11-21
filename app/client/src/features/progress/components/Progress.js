/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { sizes, margins } from '../../ui/theme'

const Bar = styled.div`
  width: 80%;
  height: ${sizes.progress};
  margin: ${margins.progress} auto;
  background: white;
  border-radius: 10px;
`

function Progress() {
  return (
    <Bar />
  )
}

export default Progress
