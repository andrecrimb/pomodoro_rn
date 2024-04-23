import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { NavigationContainer } from '@react-navigation/native'
import theme from '../theme'
import * as SplashScreen from 'expo-splash-screen'
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

SplashScreen.preventAutoHideAsync()

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    Spartan_400Regular,
    Spartan_500Medium,
    Spartan_700Bold
  })

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

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
