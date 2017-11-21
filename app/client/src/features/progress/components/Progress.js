/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { sizes, margins } from '../../ui/theme'

const Bar = styled.div`
  max-width: 100%;
  width: ${sizes.preview}px;
  height: ${sizes.progress};
  margin: ${margins.progress} auto;
  background: white;
`

function Progress() {
  return <Bar />
}

export default Progress
