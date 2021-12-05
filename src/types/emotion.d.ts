import '@emotion/react'
import theme from '../theme'

const systemTheme = theme.dark
type SystemTheme = typeof systemTheme

declare module '@emotion/react' {
  export interface Theme extends SystemTheme {}
}

// You are also able to use a 3rd party theme this way:
import '@emotion/react'
import { LibTheme } from 'some-lib'

declare module '@emotion/react' {
  export interface Theme extends LibTheme {}
}
