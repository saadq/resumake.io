import { createGlobalStyle } from 'styled-components'
import { darkTheme } from 'common/theme'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${darkTheme.foreground};
    font-family: Varela Round;
  }

  ::selection {
    background: ${darkTheme.primary};
  }
`
