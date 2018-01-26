/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf/build/entry.webpack'
import styled from 'styled-components'
import { Toolbar, LoadingBar } from '.'
import { downloadSource } from '../actions'
import { Loader } from '../../../common/components'
import { sizes } from '../../../common/theme'
import type { State as ReduxState } from '../../../app/types'
import BlankPDF from '../assets/blank.pdf'

const Wrapper = styled.div`
  width: 60%;
  position: relative;
  overflow-y: auto;
  padding-bottom: 25px;
  text-align: center;

  @media screen and (max-width: 850px) {
    ${props => props.hideOnMobile && 'display: none;'} width: 100%;
    overflow: visible;
    margin-bottom: calc(${sizes.footer} + 25px);
  }
`

const ResumePage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;

  canvas {
    max-width: 95% !important;
    height: auto !important;
  }
`

type Props = {
  resumeURL?: string,
  jsonURL?: string,
  status?: 'pending' | 'success' | 'failure',
  hideOnMobile?: boolean,
  downloadSource: () => Promise<void>
}

type State = {
  numPages: number,
  currPage: number,
  scale: number,
  isPrinting: boolean
}

const initialScale = (document.body: any).clientWidth > 1440 ? 1.75 : 1

class Preview extends Component<Props, State> {
  state = {
    numPages: 1,
    currPage: 1,
    scale: initialScale,
    isPrinting: false
  }

  setPageCount = ({ numPages }) => {
    this.setState({ numPages })
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
      scale: Math.min(prevState.scale + 0.1, initialScale)
    }))
  }

  zoomOut = () => {
    this.setState(prevState => ({
      scale: Math.max(prevState.scale - 0.1, 0.5)
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
    const {
      resumeURL,
      jsonURL,
      status,
      downloadSource,
      hideOnMobile
    } = this.props
    const { currPage } = this.state

    return (
      <Wrapper hideOnMobile={hideOnMobile}>
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
        <Document
          file={resumeURL || BlankPDF}
          onLoadSuccess={this.setPageCount}
          loading={<Loader />}
        >
          <ResumePage
            scale={this.state.scale}
            pageNumber={currPage}
            renderAnnotations={false}
            renderTextLayer={false}
          />
        </Document>
      </Wrapper>
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
  downloadSource
}

export default connect(mapState, mapActions)(Preview)
