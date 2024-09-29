import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import i18n from '../i18n'

type Props = {
  onPress: () => void
}

export const CloseButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} accessible accessibilityLabel={i18n.t('close')}>
      <AntDesign name="closecircle" size={28} color={'rgba(255,255,255,0.45)'} />
    </TouchableOpacity>
  )
}
