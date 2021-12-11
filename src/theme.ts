import { DarkTheme } from '@react-navigation/native'

export const font = {
  400: 'Spartan_400Regular',
  500: 'Spartan_500Medium',
  bold: 'Spartan_700Bold'
}

export const grey = {
  400: '#bdbdbd',
  500: '#9e9e9e',
  700: '#424242',
  800: '#2E2E2E',
  900: '#202020'
}

export const primary = {
  main: '#007AFF',
  dark: '#0063CE',
  light: '#54A6FF'
}

const dark = {
  primary,
  background: grey[900],
  card: grey[900],
  danger: '#f44336',
  text: '#fff',
  grey,
  font
}

const navigation = {
  dark: {
    dark: true,
    colors: {
      ...DarkTheme.colors,
      ...dark,
      primary: dark.primary.main
    }
  }
}

const theme = {
  dark,
  navigation
}

export default theme
