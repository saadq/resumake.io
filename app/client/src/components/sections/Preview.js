import 'whatwg-fetch'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js'
import { Row, LoadingBar } from '../bulma'
import { GeneratorActions } from '../../actions'
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

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 })
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 })
  }

  render() {
    const { url, isGenerating, downloadSource } = this.props

    if (!url) {
      return <LoadingBar />
    }

    return (
      <section id='preview'>
        <LoadingBar hidden={!isGenerating} />
        <div className='download-buttons'>
          <a href={url} download='resume.pdf' className='button'>
            <span className='icon is-small'>
              <i className='fa fa-file-pdf-o' />
              Download PDF
            </span>
          </a>
          <button className='button' onClick={() => downloadSource()}>
            <span className='icon is-small'>
              <i className='fa fa-file-code-o' />
              Download Source
            </span>
          </button>
        </div>
        <div className='page-row'>
          <button onClick={this.handlePrevious} className='button'>&larr;</button>
          <p>Page {this.state.page}</p>
          <button onClick={this.handleNext} className='button'>&rarr;</button>
        </div>
        <Row>
          <PDF
            file={url}
            page={this.state.page}
            scale={4}
            onDocumentComplete={this.onDocumentComplete}
            onPageComplete={this.onPageComplete}
          />
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
    payload: state.generator.prevResume
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downloadSource: () => dispatch(GeneratorActions.downloadSource())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
