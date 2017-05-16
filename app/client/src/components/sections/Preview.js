import 'whatwg-fetch'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js'
import { Row, LoadingBar } from '../bulma'
import { GeneratorActions } from '../../actions'
import '../../styles/components/preview.styl'

class Preview extends Component {
  onDocumentComplete = (pages) => {
    const { actions } = this.props

    actions.setTotalPages(pages)
    actions.setCurrentPage(1)
  }

  onPageComplete = (page) => {
    const { actions } = this.props

    actions.setCurrentPage(page)
  }

  render() {
    const { url, page, isGenerating, actions } = this.props

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
          <button className='button' onClick={actions.downloadSource}>
            <span className='icon is-small'>
              <i className='fa fa-file-code-o' />
              Download Source
            </span>
          </button>
        </div>
        <div className='page-row'>
          <button onClick={actions.prevPage} className='button'>
            &larr;
          </button>
          <p>Page {page}</p>
          <button onClick={actions.nextPage} className='button'>
            &rarr;
          </button>
        </div>
        <Row>
          <PDF
            file={url}
            page={page}
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
    page: state.generator.pdf.page,
    isGenerating: state.generator.isGenerating,
    form: state.form.resume,
    payload: state.generator.prevResume
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GeneratorActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
