/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import { Toolbar, LoadingBar } from './components'
import { downloadSource, setPageCount, prevPage, nextPage } from './actions'
import { print } from '../ui/actions'
import { sizes } from '../../shared/theme'
import BlankPDF from './blank.pdf'
import type { State } from '../../shared/types'

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ResumePage = styled(Page)`
  transition: opacity 0.4s ease;

  &:hover {
    opacity: 0.8;
  }

  canvas {
    max-width: 100%;
    width: ${sizes.preview}px;
    height: auto !important;
  }
`

type Props = {
  page: number,
  resumeURL?: string,
  jsonURL?: string,
  status?: 'pending' | 'success' | 'failure',
  setPageCount: (pageCount: number) => void,
  downloadSource: () => void,
  prevPage: () => void,
  nextPage: () => void,
  print: (url: string) => void
}

function Preview({
  resumeURL,
  jsonURL,
  page,
  status,
  downloadSource,
  prevPage,
  nextPage,
  print
}: Props) {
  return (
    <Div>
      <Toolbar
        resumeURL={resumeURL || BlankPDF}
        jsonURL={jsonURL}
        page={page}
        prevPage={prevPage}
        nextPage={nextPage}
        downloadSource={downloadSource}
        print={print}
      />
      <LoadingBar status={status} />
      <a href={resumeURL} target="_blank">
        <Document
          file={resumeURL}
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          noData={BlankPDF}
          loading={resumeURL || BlankPDF}
        >
          <ResumePage pageNumber={page} />
        </Document>
      </a>
    </Div>
  )
}

function mapState(state: State) {
  return {
    resumeURL: state.preview.resume.url,
    jsonURL: state.preview.data.url,
    page: state.preview.resume.page,
    status: state.preview.resume.status
  }
}

const actions = {
  downloadSource,
  setPageCount,
  prevPage,
  nextPage,
  print
}

export default connect(mapState, actions)(Preview)
