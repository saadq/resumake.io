/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import { Toolbar, LoadingBar } from '.'
import { downloadSource, setPageCount, prevPage, nextPage } from '../actions'
import { print } from '../../ui/actions'
import { sizes } from '../../ui/theme'
import BlankPDF from '../assets/blank.pdf'
import type { State } from '../../../shared/types'

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ResumePage = styled(Page)`
  transition: opacity 0.4s ease;
  height: 100% !important;

  &:hover {
    opacity: 0.8;
  }

  /* Unfortunately this is the only way to style the inner react-pdf stuff */
  canvas,
  .ReactPDF__Page,
  .ReactPDF__Page__textContent {
    max-width: 100%;
    width: ${sizes.preview}px !important;
    height: auto !important;
  }
`

const Link = styled.a`
  color: white;
  text-decoration: none;
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
      <Link href={resumeURL} target="_blank">
        <Document
          file={resumeURL || BlankPDF}
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          loading={null}
        >
          <ResumePage scale={2} pageNumber={page} />
        </Document>
      </Link>
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

const mapActions = {
  downloadSource,
  setPageCount,
  prevPage,
  nextPage,
  print
}

export default connect(mapState, mapActions)(Preview)
