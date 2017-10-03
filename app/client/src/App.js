/**
 * @flow
 */

import React, { type Node } from 'react'
import { injectGlobal } from 'styled-components'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Lato;
    font-size: 0.95em;
  }
`

type Props = {
  children: Node
}

function App({ children }: Props) {
  return <div>{children}</div>
}

export default App
