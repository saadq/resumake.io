/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="/generator">create new resume</Link>
    </div>
  )
}

export default Home
