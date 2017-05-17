import 'whatwg-fetch'
import React from 'react'
import { func, bool, number, string } from 'prop-types'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js'
import { Row, LoadingBar } from '../bulma'
import { GeneratorActions } from '../../actions'
import '../../styles/components/preview.styl'

function Preview({ url, page, isGenerating, downloadSource, setPage }) {
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
        <button onClick={() => setPage(page - 1)} className='button'>&larr;</button>
        <p>Page {page}</p>
        <button onClick={() => setPage(page + 1)} className='button'>&rarr;</button>
      </div>
      <Row>
        <PDF
          file={url}
          page={page}
          scale={4}
          onDocumentComplete={pageCount => setPage(1)}
          onPageComplete={page => setPage(page)}
        />
      </Row>
    </section>
  )
}

Preview.propTypes = {
  downloadSource: func.isRequired,
  setPage: func.isRequired,
  isGenerating: bool.isRequired,
  page: number,
  url: string
}

function mapStateToProps(state) {
  return {
    url: state.generator.pdf.url,
    page: state.generator.pdf.page,
    isGenerating: state.generator.isGenerating
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downloadSource: () => dispatch(GeneratorActions.downloadSource()),
    setPage: page => dispatch(GeneratorActions.setPage(page))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
