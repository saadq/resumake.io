import React, { Component } from 'react'
import { func, node, object } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon } from '../bulma'
import { UIActions } from '../../actions'
import '../../styles/components/content.styl'

class Content extends Component {
  static propTypes = {
    hideSideNav: func.isRequired,
    children: node.isRequired,
    history: object.isRequired,
    section: object.isRequired
  }

  componentWillMount() {
    const { location, setSectionNavigation } = this.props
    const { pathname } = location

    if (pathname.startsWith('/generator/')) {
      setSectionNavigation(pathname.slice(11))
    }
  }

  render() {
    const { hideSideNav, children, section, history } = this.props
    const { prev, next } = section

    return (
      <div onClick={hideSideNav} id="content">
        <button
          onClick={() => history.push(`/generator/${prev}`)}
          className="switch-section-button prev-section-button"
        >
          <Icon type="chevron-left" size="small" />
        </button>
        {children}
        <button
          onClick={() => history.push(`/generator/${next}`)}
          className="switch-section-button next-section-button"
        >
          <Icon type="chevron-right" size="small" />
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    section: state.ui.section
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSectionNavigation: section =>
      dispatch(UIActions.setSectionNavigation(section))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content))
