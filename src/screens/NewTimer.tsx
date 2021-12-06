import React from 'react'
import styled from '@emotion/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import SafeArea from '../components/SafeArea'
import Button from '../components/Button'
import i18n from '../i18n'
import { HomeStackParamList } from '../types/stackParamList'

const NewTimer = ({ navigation }: NativeStackScreenProps<HomeStackParamList>) => {
  return (
    <SafeArea>
      <Container>
        <Button onPress={() => navigation.pop()} title={i18n.t('add_timer')} />
      </Container>
    </SafeArea>
  )
}

const Container = styled.View`
  flex: 1;
`

export default NewTimer
