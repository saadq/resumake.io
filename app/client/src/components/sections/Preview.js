import 'whatwg-fetch'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PDF from 'react-pdf-js'
import { Row } from '../bulma'
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
    if (!this.props.url) {
      return <div>Loading PDF</div>
    } else {
      return (
        <section id='preview'>
          <Row>
            <PDF scale={3} file={this.props.url} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} />
          </Row>
        </section>
      )
    }
  }
}

const mapStateToProps = state => ({
  url: state.resume.resumeURL
})

export default connect(
  mapStateToProps
)(Preview)
