import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import i18n from '../i18n'
import NewTimer from '../screens/NewTimer'
import RunningTimer from '../screens/RunningTimer'
import { font, primary } from '../theme'
import TomatoButton from '../components/TomatoButton'
import { HomeStackParamList } from '../types/stackParamList'
import EditTimer from '../screens/EditTimer'

const Stack = createNativeStackNavigator<HomeStackParamList>()

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
        name="home"
        options={{
          title: i18n.t('time_tracker'),
          headerRight: () => <TomatoButton onPress={() => {}} />
        }}
      />
      <Stack.Screen
        component={NewTimer}
        name="newTimer"
        options={{ title: i18n.t('new_timer'), presentation: 'formSheet' }}
      />
      <Stack.Screen
        component={EditTimer}
        name="editTimer"
        options={({ route }) => ({ title: route.params.name, presentation: 'formSheet' })}
      />
      <Stack.Screen
        component={RunningTimer}
        name="runningTimer"
        options={({ route }) => ({
          presentation: 'formSheet',
          title: route.params.name,
          headerStyle: { backgroundColor: primary.main }
        })}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
