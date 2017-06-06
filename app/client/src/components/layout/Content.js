import React from 'react'
import { func, node, object } from 'prop-types'
import '../../styles/components/content.styl'

function Content({ hideSideNav, children }) {
  return (
    <div onClick={hideSideNav} id="content">
      <button className="switch-section-button prev-section-button">
        <span className="icon is-small">
          <i className="fa fa-chevron-left" />
        </span>
      </button>
      {children}
      <button className="switch-section-button next-section-button">
        <span className="icon is-small">
          <i className="fa fa-chevron-right" />
        </span>
      </button>
    </div>
  )
}

Content.propTypes = {
  hideSideNav: func.isRequired,
  children: node.isRequired,
  history: object.isRequired
}

export default Content
