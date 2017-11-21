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
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: ${margins.progress};
  background: white;
  border-radius: 10px;
`

function Progress() {
  return <Bar />
}

export default Progress
