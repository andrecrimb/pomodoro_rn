import React from 'react'
import TimersList from '../components/TimersList'
import i18n from '../i18n'
import Button from '../components/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import SafeArea from '../components/SafeArea'
import { HomeStackParamList } from '../types/stackParamList'
import styled from '@emotion/native'

const Home = ({ navigation }: NativeStackScreenProps<HomeStackParamList>) => {
  return (
    <SafeArea>
      <TimersList />
      <Footer>
        <Button onPress={() => navigation.push('newTimer')} title={i18n.t('new_timer')} />
      </Footer>
    </SafeArea>
  )
}

//#region Styles
const Footer = styled.View`
  margin: 10px 16px 5px 16px;
`
//#endregion

export default Home
