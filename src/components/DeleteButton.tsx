import React from 'react'
import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import i18n from '../i18n'

//#region Props
type Props = {
  onPress: () => void
}
//#endregion

export default ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} accessible accessibilityLabel={i18n.t('delete')}>
      <Wrapper>
        <MaterialIcons name="delete" size={28} color="#fff" />
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
  background-color: ${p => p.theme.danger};
`
//#endregion
