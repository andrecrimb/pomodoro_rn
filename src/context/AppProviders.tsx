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
import { SafeAreaProvider } from 'react-native-safe-area-context'

//* setup internationalization
import '../i18n'
import { TimersProvider } from './TimersContext'

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    Spartan_400Regular,
    Spartan_500Medium,
    Spartan_700Bold
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <ThemeProvider theme={theme.dark}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme.navigation.dark}>
          <TimersProvider>{children}</TimersProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default AppProviders
