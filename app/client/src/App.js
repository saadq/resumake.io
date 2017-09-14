/**
 * @flow
 */

import React from 'react'
import { injectGlobal } from 'styled-components'
import Templates from './pages/Generator'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Lato;
    font-size: .95em;
  }
`

function App() {
  return (
    <div>
      <Templates />
    </div>
  )
}

export default App
