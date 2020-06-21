import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.foreground};
    font-family: Varela Round;
  }

  ::selection {
    background: ${(props) => props.theme.primary};
  }
`
