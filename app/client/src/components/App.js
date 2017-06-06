import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { UIActions } from '../actions'

class App extends Component {
  static propTypes = {
    history: object.isRequired,
    setSectionNavigation: func.isRequired
  }

  componentDidMount() {
    const { history, setSectionNavigation } = this.props

    this.unlisten = history.listen(({ pathname }) => {
      if (pathname.startsWith('/generator/')) {
        setSectionNavigation(pathname.slice(11))
      }
    })
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    setSectionNavigation: section =>
      dispatch(UIActions.setSectionNavigation(section))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
