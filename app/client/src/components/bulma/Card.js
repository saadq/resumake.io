import React from 'react'
import { node, string } from 'prop-types'

function Card({ children, classes = '', ...props }) {
  return (
    <div className={`card ${classes}`} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: node.isRequired,
  classes: string
}

export default Card
