import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import i18n from '../i18n'
import NewTimer from '../screens/NewTimer'
import { font } from '../theme'
import TomatoButton from '../components/TomatoButton'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: font.bold },
        headerTitleAlign: 'center',
        headerShadowVisible: false
      }}>
      <Stack.Screen
        component={Home}
        name={i18n.t('time_tracker')}
        options={{
          headerRight: () => <TomatoButton onPress={() => {}} />
        }}
      />
      <Stack.Screen
        component={NewTimer}
        name={i18n.t('new_timer')}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
