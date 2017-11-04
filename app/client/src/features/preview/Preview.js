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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

type Props = {
  resumeURL?: string
}

const ResumePage = styled(Page)`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);

  canvas {
    max-width: 100%;
    height: auto !important;
  }
`

function Preview({ resumeURL }: Props) {
  return (
    <Div>
      <Document file={resumeURL || BlankPDF}>
        <ResumePage
          width={sizes.preview}
          pageNumber={1}
        />
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
