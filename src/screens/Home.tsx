import React from 'react'
import TimersList from '../components/TimersList'
import i18n from '../i18n'
import Button from '../components/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeArea } from '../components/SafeArea'
import { HomeStackParamList } from '../types/stackParamList'
import { StyleSheet, View } from 'react-native'

export const Home = ({ navigation }: NativeStackScreenProps<HomeStackParamList, 'home'>) => {
  return (
    <SafeArea>
      <TimersList />
      <View style={styles.footer}>
        <Button onPress={() => navigation.push('newTimer')} title={i18n.t('new_timer')} />
      </View>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  footer: {
    marginVertical: 10,
    marginHorizontal: 16
  }
})
