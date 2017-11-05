/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import BlankPDF from './blank.pdf'
import { sizes } from '../../shared/theme'
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
  resumeURL?: string
}

function Preview({ resumeURL }: Props) {
  return (
    <Div>
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

export default connect(mapState)(Preview)
