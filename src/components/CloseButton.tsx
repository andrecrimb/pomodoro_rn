import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { grey } from '../theme'
import i18n from '../i18n'

type Props = {
  onPress: () => void
}

export default ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} accessible accessibilityLabel={i18n.t('close')}>
      <AntDesign name="closecircle" size={28} color={'rgba(255,255,255,0.45)'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})
