/**
 * @flow
 */

import React from 'react'
import { injectGlobal } from 'styled-components'
import Generator from './pages/Generator'

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
      <Generator />
    </div>
  )
}

export default App
