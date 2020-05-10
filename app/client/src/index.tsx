import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './app/components/App'

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector('#root')
)
