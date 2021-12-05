import React from 'react'
import TimersList from '../components/TimersList'
import i18n from '../i18n'
import Button from '../components/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import SafeArea from '../components/SafeArea'

const Home = ({ navigation }: NativeStackScreenProps<any>) => {
  return (
    <SafeArea>
      <TimersList />
      <Button onPress={() => navigation.push(i18n.t('new_timer'))} title={i18n.t('new_timer')} />
    </SafeArea>
  )
}

export default Home
