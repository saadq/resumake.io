import React from 'react'
import { func, node } from 'prop-types'
import { Container } from '../bulma'
import '../../styles/components/content.styl'

function Content({ hideSideNav, children }) {
  return (
    <div onClick={hideSideNav} id='content'>
      <Container fluid>
        {children}
      </Container>
    </div>
  )
}

Content.propTypes = {
  hideSideNav: func.isRequired,
  children: node.isRequired
}

export default Content
