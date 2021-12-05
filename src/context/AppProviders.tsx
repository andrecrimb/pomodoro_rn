import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { NavigationContainer } from '@react-navigation/native'
import theme from '../theme'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Spartan_400Regular,
  Spartan_500Medium,
  Spartan_700Bold
} from '@expo-google-fonts/spartan'

//* setup dayjs
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'intl'
import 'intl/locale-data/jsonp/en'

//* setup internationalization
import '../i18n'

//* dayjs default props
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    Spartan_400Regular,
    Spartan_500Medium,
    Spartan_700Bold
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <ThemeProvider theme={theme.dark}>
      <NavigationContainer theme={theme.navigation.dark}>{children}</NavigationContainer>
    </ThemeProvider>
  )
}

export default AppProviders
