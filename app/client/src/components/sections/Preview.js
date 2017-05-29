import 'whatwg-fetch'
import React, { Component } from 'react'
import { object, number, string } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PDF from 'react-pdf'
import { LoadingBar } from '../bulma'
import { GeneratorActions, UIActions } from '../../actions'
import BlankPDF from '../../assets/blank.pdf'
import '../../styles/components/preview.styl'

class Preview extends Component {
  static propTypes = {
    actions: object.isRequired,
    dimensions: object.isRequired,
    scale: number.isRequired,
    status: string,
    page: number,
    url: string
  }

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

  render() {
    const { url, page, status, actions, dimensions, scale } = this.props
    const width = dimensions.width / scale

    return (
      <section id="preview">
        <div className="controls">
          <div className="download-buttons">
            <a href={url} download="resume.pdf" className="button">
              <span className="icon is-small">
                <i className="fa fa-file-pdf-o" />
                <span className="is-hidden-small">PDF</span>
              </span>
            </a>
            <button className="button" onClick={actions.downloadSource}>
              <span className="icon is-small">
                <i className="fa fa-file-code-o" />
                <span className="is-hidden-small">Source</span>
              </span>
            </button>
          </div>
          <div className="page-controls">
            <button onClick={actions.prevPage} className="button">←</button>
            <p><span className="is-hidden-small">Page</span> {page}</p>
            <button onClick={actions.nextPage} className="button">→</button>
          </div>
          <div className="zoom-controls">
            <button onClick={actions.zoomOut} className="button">
              <span className="icon is-small">
                <i className="fa fa-search-minus" />
              </span>
            </button>
            <button onClick={actions.zoomIn} className="button">
              <span className="icon is-small">
                <i className="fa fa-search-plus" />
              </span>
            </button>
            <button onClick={() => actions.print(url)} className="button">
              <span className="icon is-small">
                <i className="fa fa-print" />
              </span>
            </button>
          </div>
        </div>
        <LoadingBar width={width} hidden={status !== 'pending'} />
        <PDF
          file={url || BlankPDF}
          width={width}
          pageIndex={page - 1}
          onDocumentLoad={({ total }) => {
            actions.setPageCount(total)
            actions.setPage(1)
          }}
        />
      </section>
    )
  }
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
    dimensions: state.ui.dimensions,
    scale: state.ui.scale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
