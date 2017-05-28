import React from 'react'
import { func, node } from 'prop-types'
import '../../styles/components/content.styl'

function Content({ hideSideNav, children }) {
  return (
    <div onClick={hideSideNav} id="content">
      {children}
    </div>
  )
}

Content.propTypes = {
  hideSideNav: func.isRequired,
  children: node.isRequired
}

export default Content
