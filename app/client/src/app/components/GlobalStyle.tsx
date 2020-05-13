import { createGlobalStyle } from 'styled-components'
import { darkTheme } from '../../common/theme'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${darkTheme.foreground};
  }
`
