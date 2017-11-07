/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import { Toolbar, LoadingBar } from './components'
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
  status?: 'pending' | 'success' | 'failure',
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
    const { url, page, status, downloadSource, prevPage, nextPage } = this.props
    return (
      <Div>
        <Toolbar
          url={url || BlankPDF}
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          downloadSource={downloadSource}
        />
        <LoadingBar status={status} />
        <Document file={url} onLoadSuccess={this.onDocumentLoad} loading={null} noData={null}>
          <ResumePage width={sizes.preview} pageNumber={page} />
        </Document>
      </Div>
    )
  }
}

function mapState(state: State) {
  return {
    url: state.preview.resume.url,
    page: state.preview.resume.page,
    status: state.preview.resume.status
  }
}

const actions = {
  downloadSource,
  setPageCount,
  prevPage,
  nextPage
}

export default connect(mapState, actions)(Preview)
