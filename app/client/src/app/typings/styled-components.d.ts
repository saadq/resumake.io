import 'styled-components'
import { Theme } from 'common/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
