import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string
    foreground: string
    primary: string
    primaryAccent: string
    black: string
    lightBlack: string
    darkGray: string
    gray: string
    lightGray: string
    white: string
    labelText: string
  }
}
