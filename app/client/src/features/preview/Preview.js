/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import { Toolbar } from './components'
import { downloadSource, setPageCount, prevPage, nextPage } from './actions'
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
  page: number,
  url?: string,
  setPageCount: (pageCount: number) => void,
  downloadSource: () => void,
  prevPage: () => void,
  nextPage: () => void
}

class Preview extends Component<Props> {
  onDocumentLoad = ({ numPages }) => {
    this.props.setPageCount(numPages)
  }

  render() {
    const { url, page, downloadSource, prevPage, nextPage } = this.props
    return (
      <Div>
        <Toolbar
          url={url || BlankPDF}
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          downloadSource={downloadSource}
        />
        <Document file={url || BlankPDF} onLoadSuccess={this.onDocumentLoad}>
          <ResumePage width={sizes.preview} pageNumber={page} />
        </Document>
      </Div>
    )
  }
}

function mapState(state: State) {
  return {
    url: state.preview.resume.url,
    page: state.preview.resume.page
  }
}

const actions = {
  downloadSource,
  setPageCount,
  prevPage,
  nextPage
}

export default connect(mapState, actions)(Preview)
