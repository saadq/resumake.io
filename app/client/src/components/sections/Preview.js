import 'whatwg-fetch'
import React, { Component } from 'react'
import { object, number, string } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js'
import { Row, LoadingBar } from '../bulma'
import { GeneratorActions, UIActions } from '../../actions'
import BlankPDF from '../../assets/blank.pdf'
import '../../styles/components/preview.styl'

class Preview extends Component {
  componentWillMount() {
    this.updateWindowDimensions()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    const { actions } = this.props
    const { innerWidth, innerHeight } = window

    actions.setWindowDimensions({
      width: innerWidth,
      height: innerHeight
    })
  }

  calculateScale = () => {
    const { dimensions } = this.props

    if (!dimensions) {
      return
    }

    const { width } = dimensions

    if (width > 1000) return 4
    if (width > 768) return 3
    if (width > 500) return 2

    return 1
  }

  render() {
    const { url, page, status, actions } = this.props

    return (
      <section id="preview">
        <LoadingBar hidden={status !== 'pending'} />
        <div className="download-buttons">
          <a href={url} download="resume.pdf" className="button">
            <span className="icon is-small">
              <i className="fa fa-file-pdf-o" />
              Download PDF
            </span>
          </a>
          <button className="button" onClick={() => actions.downloadSource()}>
            <span className="icon is-small">
              <i className="fa fa-file-code-o" />
              Download Source
            </span>
          </button>
        </div>
        <div className="page-row">
          <button onClick={actions.prevPage} className="button">←</button>
          <p>Page {page}</p>
          <button onClick={actions.nextPage} className="button">→</button>
        </div>
        <Row>
          <PDF
            file={url || BlankPDF}
            page={page}
            scale={this.calculateScale()}
            onDocumentComplete={pageCount => {
              actions.setPageCount(pageCount)
              actions.setPage(1)
            }}
          />
        </Row>
      </section>
    )
  }
}

Preview.propTypes = {
  actions: object.isRequired,
  status: string,
  page: number,
  url: string
}

const actionCreators = {
  ...GeneratorActions,
  ...UIActions
}

function mapStateToProps(state) {
  return {
    url: state.generator.pdf.url,
    page: state.generator.pdf.page,
    status: state.generator.status,
    dimensions: state.ui.dimensions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
