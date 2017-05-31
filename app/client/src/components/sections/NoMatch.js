import React from 'react'
import { Link } from 'react-router-dom'

function NoMatch() {
  return (
    <section className="form-section" id="no-match">
      <h1>This page does not exist ¯\_(ツ)_/¯</h1>
      <Link to="/generator/templates">Go back to the generator</Link>
    </section>
  )
}

export default NoMatch
