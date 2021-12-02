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
    font-family: Poppins, CircularStd-Book, sans-serif;
    font-family: Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    background: ${colors.background};
    color: ${colors.foreground};
  }
`
