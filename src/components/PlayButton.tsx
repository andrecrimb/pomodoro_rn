import React from 'react'
import styled from '@emotion/native'
import { TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

//#region Props
type Props = {
  onPress: () => void
}
//#endregion

export default ({ onPress }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <PlayWrapper>
        <Ionicons name="play" size={24} color="#fff" style={{ marginLeft: 4 }} />
      </PlayWrapper>
    </TouchableWithoutFeedback>
  )
}

//#region Styles
const PlayWrapper = styled.View`
  border-radius: 30px;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.primary.main};
`
//#endregion