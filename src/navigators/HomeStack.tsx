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
import CloseButton from '../components/CloseButton'

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
        options={({ navigation }) => ({
          title: i18n.t('new_timer'),
          presentation: 'formSheet',
          headerLeft: () => <CloseButton onPress={() => navigation.pop()} />
        })}
      />
      <Stack.Screen
        component={EditTimer}
        name="editTimer"
        options={({ route, navigation }) => ({
          title: route.params.name,
          presentation: 'formSheet',
          headerLeft: () => <CloseButton onPress={() => navigation.pop()} />
        })}
      />
      <Stack.Screen
        component={RunningTimer}
        name="runningTimer"
        options={({ route, navigation }) => ({
          presentation: 'formSheet',
          title: route.params.name,
          headerStyle: { backgroundColor: primary.main },
          headerLeft: () => <CloseButton onPress={() => navigation.pop()} />
        })}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
