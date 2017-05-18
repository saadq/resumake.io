import 'whatwg-fetch'
import React from 'react'
import { object, number, string } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js'
import { Row, LoadingBar } from '../bulma'
import { GeneratorActions } from '../../actions'
import BlankPDF from '../../assets/blank.pdf'
import '../../styles/components/preview.styl'

function Preview({ url, page, status, actions }) {
  return (
    <section id='preview'>
      <LoadingBar hidden={status !== 'pending'} />
      <div className='download-buttons'>
        <a href={url} download='resume.pdf' className='button'>
          <span className='icon is-small'>
            <i className='fa fa-file-pdf-o' />
            Download PDF
          </span>
        </a>
        <button className='button' onClick={() => actions.downloadSource()}>
          <span className='icon is-small'>
            <i className='fa fa-file-code-o' />
            Download Source
          </span>
        </button>
      </div>
      <div className='page-row'>
        <button onClick={actions.prevPage} className='button'>&larr;</button>
        <p>Page {page}</p>
        <button onClick={actions.nextPage} className='button'>&rarr;</button>
      </div>
      <Row>
        <PDF
          file={url || BlankPDF}
          page={page}
          scale={4}
          onDocumentComplete={(pageCount) => {
            actions.setPageCount(pageCount)
            actions.setPage(1)
          }}
          onPageComplete={page => actions.setPage(page)}
        />
      </Row>
    </section>
  )
}

Preview.propTypes = {
  actions: object.isRequired,
  status: string,
  page: number,
  url: string
}

function mapStateToProps(state) {
  return {
    url: state.generator.pdf.url,
    page: state.generator.pdf.page,
    status: state.generator.status
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
