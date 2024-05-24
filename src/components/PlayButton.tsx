import React from 'react'
import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import i18n from '../i18n'

//#region Props
type Props = {
  onPress: () => void
}
//#endregion

export const PlayButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible
      accessibilityLabel={i18n.t('start_focus_sections')}>
      <Wrapper>
        <Ionicons name="play" size={28} color="#fff" style={{ marginLeft: 4 }} />
      </Wrapper>
    </TouchableOpacity>
  )
}

//#region Styles
const Wrapper = styled.View`
  border-radius: 30px;
  height: 46px;
  width: 46px;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.primary.main};
`
//#endregion
