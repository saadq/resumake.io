import 'whatwg-fetch'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js'
import { Row, LoadingBar } from '../bulma'
import FileSaver from 'file-saver'
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

  downloadSource = () => {
    const { template, form } = this.props
    const { values = {} } = form

    const payload = {
      template,
      ...values
    }

    window.fetch('/api/generate/source', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'same-origin'
    })
    .then(res => res.blob())
    .then(blob => FileSaver.saveAs(blob, 'resume.zip'))
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
          <button className='button' onClick={this.downloadSource}>Download Source</button>
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
    url: state.generator.pdf.url,
    isGenerating: state.generator.isGenerating,
    form: state.form.resume,
    template: state.generator.template
  }
}

export default connect(mapStateToProps)(Preview)
