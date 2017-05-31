import React from 'react'
import { string, node } from 'prop-types'

function Icon({ size, type, children, to, ...props }) {
  const icon = (
    <span className={`icon ${size ? `is-${size}` : ''}`.trim()}>
      <i className={`fa fa-${type}`.trim()} {...props}>
        {children}
      </i>
    </span>
  )

  return to ? <a className="nav-item" href={to}>{icon}</a> : icon
}

Icon.propTypes = {
  type: string.isRequired,
  size: string,
  children: node
}

export default Icon
