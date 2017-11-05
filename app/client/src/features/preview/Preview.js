/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import { Toolbar } from './components'
import { downloadSource } from './actions'
import { sizes } from '../../shared/theme'
import BlankPDF from './blank.pdf'
import type { State } from '../../shared/types'

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ResumePage = styled(Page)`
  canvas {
    max-width: 100%;
    height: auto !important;
  }
`

type Props = {
  downloadSource: () => void,
  resumeURL?: string
}

function Preview({ resumeURL, downloadSource }: Props) {
  return (
    <Div>
      <Toolbar downloadSource={downloadSource} src={resumeURL || BlankPDF} />
      <Document file={resumeURL || BlankPDF}>
        <ResumePage width={sizes.preview} pageNumber={1} />
      </Document>
    </Div>
  )
}

function mapState(state: State) {
  return {
    resumeURL: state.preview.resumeURL
  }
}

const actions = {
  downloadSource
}

export default connect(mapState, actions)(Preview)
