/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf/build/entry.webpack'
import styled from 'styled-components'
import { Toolbar, LoadingBar } from '.'
import { downloadSource, setPageCount, prevPage, nextPage } from '../actions'
import { print } from '../../ui/actions'
import BlankPDF from '../assets/blank.pdf'
import type { State as ReduxState } from '../../../shared/types'

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ResumePage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100% !important;

  canvas,
  .ReactPDF__Page__textContent {
    max-width: 100%;
    width: ${props => props.zoom}% !important;
    min-width: 50%;
    height: auto !important;
    transition: box-shadow 0.4s ease;
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

type State = {
  zoom: number
}

class Preview extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 85
    }
  }

  zoomIn = () => {
    this.setState(prevState => ({
      zoom: Math.min(prevState.zoom + 10, 85)
    }))
  }

  zoomOut = () => {
    this.setState(prevState => ({
      zoom: Math.max(prevState.zoom - 10, 45)
    }))
  }

  render() {
    const {
      resumeURL = BlankPDF,
      jsonURL,
      page,
      status,
      downloadSource,
      prevPage,
      nextPage,
      print
    } = this.props
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
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
        />
        <LoadingBar status={status} />
        <Document
          file={resumeURL}
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          loading={<div />}
        >
          <ResumePage zoom={this.state.zoom} scale={2} pageNumber={page} />
        </Document>
      </Div>
    )
  }
}

function mapState(state: ReduxState) {
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
