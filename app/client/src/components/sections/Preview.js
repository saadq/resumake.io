import 'whatwg-fetch'
import React, { Component } from 'react'
import { object, number, string } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PDF from 'react-pdf'
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
    const { width } = dimensions

    if (width > 1000) return 4
    if (width > 768) return 3
    if (width > 500) return 2

    return 1
  }

  onDocumentLoad = ({ total }) => {
    const { actions } = this.props

    actions.setPageCount(total)
    actions.setPage(1)
  }

  render() {
    const { url, page, status, actions, dimensions } = this.props
    const width = dimensions.width / 1.25

    return (
      <section id="preview">
        <LoadingBar hidden={status !== 'pending'} />
        <div style={{ width }} className="controls">
          <div className="download-buttons">
            <a href={url} download="resume.pdf" className="button">
              <span className="icon is-small">
                <i className="fa fa-file-pdf-o" />
                <span className="is-hidden-small">Download PDF</span>
              </span>
            </a>
            <button className="button" onClick={() => actions.downloadSource()}>
              <span className="icon is-small">
                <i className="fa fa-file-code-o" />
                <span className="is-hidden-small">Download Source</span>
              </span>
            </button>
          </div>
          <div className="page-controls">
            <button onClick={actions.prevPage} className="button">←</button>
            <p><span className="is-hidden-small">Page</span> {page}</p>
            <button onClick={actions.nextPage} className="button">→</button>
          </div>
          <div className="zoom-controls">
            <button className="button">
              <span className="icon is-small">
                <i className="fa fa-search-minus" />
              </span>
            </button>
            <button className="button">
              <span className="icon is-small">
                <i className="fa fa-search-plus" />
              </span>
            </button>
          </div>
        </div>
        <Row>
          <PDF
            file={url || BlankPDF}
            width={width}
            pageIndex={page - 1}
            onDocumentLoad={this.onDocumentLoad}
          />
        </Row>
      </section>
    )
  }
}

Preview.propTypes = {
  actions: object.isRequired,
  dimensions: object.isRequired,
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
