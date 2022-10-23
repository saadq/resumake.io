import { createGlobalStyle } from 'styled-components'
import cssReset from 'styled-reset'
import { colors } from '../../theme'

export const GlobalStyle = createGlobalStyle`
  ${cssReset}

  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 0.95rem;
    background: ${colors.background};
    color: ${colors.foreground};
  }
`
