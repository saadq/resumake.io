import 'whatwg-fetch'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js'
import { Row, LoadingBar } from '../bulma'
import '../../styles/components/preview.styl'

class Preview extends Component {
  constructor(props) {
    super(props)
    this.onDocumentComplete = this.onDocumentComplete.bind(this)
    this.onPageComplete = this.onPageComplete.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.state = {}
  }

  onDocumentComplete(pages) {
    this.setState({ page: 1, pages })
  }

  onPageComplete(page) {
    this.setState({ page })
  }

  handlePrevious() {
    this.setState({ page: this.state.page - 1 })
  }

  handleNext() {
    this.setState({ page: this.state.page + 1 })
  }

  render() {
    const { url, isGenerating } = this.props

    if (!url) {
      return <LoadingBar />
    }

    return (
      <section id='preview'>
        <LoadingBar hidden={!isGenerating} />
        <div className='download-buttons'>
          <a href={url} download='resume.pdf' className='button'>Download PDF</a>
          <a href='/api/generate/source' className='button'>Download TeX</a>
        </div>
        <Row>
          <PDF scale={4} file={url} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} />
        </Row>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    url: state.generator.resumeURL,
    isGenerating: state.generator.isGenerating
  }
}

export default connect(mapStateToProps)(Preview)
