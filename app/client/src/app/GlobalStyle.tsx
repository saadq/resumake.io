import { createGlobalStyle } from 'styled-components'
import cssReset from 'styled-reset'
import { colors } from '../common/theme'

export const GlobalStyle = createGlobalStyle`
  ${cssReset}

  html, body {
    width: 100%;
    height: 100%;
    font-family: Open Sans, sans-serif;
    background: ${colors.background};
    color: ${colors.foreground};
  }
`
