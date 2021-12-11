import React from 'react'
import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

//#region Props
type Props = {
  onPress: () => void
}
//#endregion

export default ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
