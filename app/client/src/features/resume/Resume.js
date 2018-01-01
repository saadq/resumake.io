/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf/build/entry.webpack'
import styled from 'styled-components'
import { margins } from '../../common/theme'
import type { State as ReduxState } from '../../app/types'
import BlankPDF from '../preview/assets/blank.pdf'
import Toolbar from '../preview/components/Toolbar'

const Wrapper = styled.div`
  width: calc(50% - ${margins.content} - ${margins.content});
  height: 100%;
  margin: 0 auto;
`

const ResumeDocument = styled(Document)`
  width: 100%;
  height: 100%;
  margin-left: 45px;
`

const ResumePage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25% !important;

  canvas,
  .ReactPDF__Page__textContent {
    max-width: 100%;
    max-height: 100%;
    height: 25% !important;
    transition: box-shadow 0.4s ease;
  }
`

type Props = {
  resumeURL: string
}

type State = {
  numPages: number,
  currPage: number,
  zoom: number
}

class Resume extends Component<Props, State> {
  state = {
    numPages: 1,
    currPage: 1,
    zoom: 65
  }

  setPageCount = ({ numPages }) => {
    this.setState(() => ({ numPages }))
  }

  render() {
    return (
      <Wrapper>
        <Toolbar />
        <ResumeDocument
          file={this.props.resumeURL || BlankPDF}
          onLoadSuccess={this.setPageCount}
          loading={<div />}
        >
          <ResumePage
            pageNumber={1}
            renderAnnotations={false}
            renderTextLayer={false}
          />
        </ResumeDocument>
      </Wrapper>
    )
  }
}

function mapState(state: ReduxState) {
  return {
    resumeURL: state.preview.resume.url,
    page: state.preview.resume.page
  }
}

export default connect(mapState)(Resume)
