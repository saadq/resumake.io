import React from 'react'
import { node, string } from 'prop-types'

const Card = ({ children, classes = '', ...props }) => (
  <div className={`card ${classes}`} {...props}>
    {children}
  </div>
)

Card.propTypes = {
  children: node.isRequired,
  classes: string
}

export default Card
