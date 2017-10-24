/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import BlankPDF from './blank.pdf'
import type { State } from '../../shared/types'

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  resumeURL?: string
}

function Preview({ resumeURL }: Props) {
  return (
    <Div>
      <Document file={resumeURL || BlankPDF}>
        <Page pageNumber={1} />
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
