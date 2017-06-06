import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

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

class App extends Component {
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
      <div id="app">
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(App)
