import React, { Component } from 'react'
import { func, node, object } from 'prop-types'
import { withRouter } from 'react-router-dom'
import '../../styles/components/content.styl'

const sections = [
  'templates',
  'profile',
  'education',
  'experience',
  'skills',
  'projects',
  'awards',
  'preview'
]

class Content extends Component {
  componentDidMount() {
    const { history } = this.props

    this.unlisten = history.listen(({ pathname }) => {
      if (pathname.startsWith('/generator/')) {
        this.updateSectionNavigation(pathname.slice(11))
      }
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  updateSectionNavigation(sectionName) {
    const prevIndex = sections.indexOf(sectionName) - 1
    const nextIndex = sections.indexOf(sectionName) + 1

    const prev = sections[prevIndex >= 0 ? prevIndex : 0]
    const curr = sectionName
    const next = sections[nextIndex <= sections.length - 1 ? nextIndex : sections.length - 1]

    console.log('prev: ', prev)
    console.log('curr: ', curr)
    console.log('next: ', next)
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
