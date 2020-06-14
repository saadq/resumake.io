export interface Theme {
  background: string
  foreground: string
  primary: string
  primaryAccent: string
  black: string
  darkBlack: string
  lightBlack: string
  darkGray: string
  gray: string
  lightGray: string
  white: string
  labelText: string
}

export const lightTheme: Theme = {
  background: '#0000FF',
  foreground: '#FFFF00',
  primary: '#FF6600',
  primaryAccent: '#686EF3',
  black: '#FF0000',
  darkBlack: '#111314',
  lightBlack: '#00FF00',
  darkGray: '#6600FF',
  gray: '#000000',
  lightGray: '#FF22FF',
  white: '#FFFFFF',
  labelText: '#ab2343'
}

export const darkTheme: Theme = {
  background: '#181B1F',
  foreground: '#788396',
  primary: '#8A8FFF',
  primaryAccent: '#686EF3',
  black: '#181B1F',
  darkBlack: '#111314',
  lightBlack: '#1D2026',
  darkGray: '#212429',
  gray: '#2A2D33',
  lightGray: '#2F3237',
  white: '#FFFFFF',
  labelText: '#c0c5ce'
}
