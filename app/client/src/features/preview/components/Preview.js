/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf/build/entry.webpack'
import styled from 'styled-components'
import { Toolbar, LoadingBar } from '.'
import { downloadSource, setPageCount, prevPage, nextPage } from '../actions'
import BlankPDF from '../assets/blank.pdf'
import type { State as ReduxState } from '../../../app/types'

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ResumeDocument = styled(Document)`
  width: 100%;
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
  resumeURL?: string,
  jsonURL?: string,
  status?: 'pending' | 'success' | 'failure',
  setPageCount: (pageCount: number) => void,
  downloadSource: () => void
}

type State = {
  numPages: number,
  currPage: number,
  zoom: number,
  isPrinting: boolean
}

class Preview extends Component<Props, State> {
  state = {
    numPages: 1,
    currPage: 1,
    zoom: 65,
    isPrinting: false
  }

  setPageCount = ({ numPages }) => {
    this.setState(() => ({ numPages }))
  }

  nextPage = () => {
    this.setState(prevState => ({
      currPage: Math.min(prevState.currPage + 1, this.state.numPages)
    }))
  }

  prevPage = () => {
    this.setState(prevState => ({
      currPage: Math.max(prevState.currPage - 1, 1)
    }))
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

  print = (url: string) => {
    if (/Android/i.test(navigator.userAgent) || this.state.isPrinting) {
      return
    }

    const frame = document.createElement('iframe')

    frame.addEventListener('load', () => {
      const win = frame.contentWindow

      win.focus()
      win.print()
      win.addEventListener('focus', () =>
        (document.body: any).removeChild(frame)
      )
    })

    Object.assign(frame.style, {
      visibility: 'hidden',
      position: 'fixed',
      right: '0',
      bottom: '0'
    })

    frame.src = url
    ;(document.body: any).appendChild(frame)
  }

  render() {
    const { resumeURL, jsonURL, status, downloadSource } = this.props
    const { currPage } = this.state

    return (
      <Div>
        <Toolbar
          resumeURL={resumeURL || BlankPDF}
          jsonURL={jsonURL}
          downloadSource={downloadSource}
          currPage={currPage}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          print={this.print}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
        />
        <LoadingBar status={status} />
        <ResumeDocument
          file={resumeURL}
          onLoadSuccess={this.setPageCount}
          loading={<div />}
        >
          <ResumePage
            pageNumber={currPage}
            zoom={this.state.zoom}
            scale={2}
            renderAnnotations={false}
            renderTextLayer={false}
          />
        </ResumeDocument>
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
  nextPage
}

export default connect(mapState, mapActions)(Preview)
