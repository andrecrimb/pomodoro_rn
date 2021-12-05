import { DefaultTheme, DarkTheme } from '@react-navigation/native'

export const font = {
  400: 'Spartan_400Regular',
  500: 'Spartan_500Medium',
  bold: 'Spartan_700Bold'
}

const grey = {
  400: '#bdbdbd',
  500: '#9e9e9e',
  800: '#2E2E2E',
  900: '#202020'
}

export const primary = {
  main: '#007AFF',
  dark: '#004794',
  light: '#54A6FF'
}

const dark = {
  primary,
  background: grey[900],
  card: grey[900],
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
