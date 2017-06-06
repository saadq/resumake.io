import React, { Component } from 'react'
import { func, node, object } from 'prop-types'
import { withRouter } from 'react-router-dom'
import '../../styles/components/content.styl'

class Content extends Component {
  componentDidMount() {
    const { history } = this.props

    this.unlisten = history.listen(({ pathname }) => {
      if (pathname.startsWith('/generator/')) {
        const section = pathname.slice(11)

        console.log(history)

        this.updateSectionNavigation(section)
      }
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  updateSectionNavigation(section) {
    console.log(section)
  }

  render() {
    return (
      <div onClick={this.props.hideSideNav} id="content">
        <button className="switch-section-button prev-section-button">
          <span className="icon is-small">
            <i className="fa fa-chevron-left" />
          </span>
        </button>
        {this.props.children}
        <button className="switch-section-button next-section-button">
          <span className="icon is-small">
            <i className="fa fa-chevron-right" />
          </span>
        </button>
      </div>
    )
  }
}

Content.propTypes = {
  hideSideNav: func.isRequired,
  children: node.isRequired,
  history: object.isRequired
}

export default withRouter(Content)
