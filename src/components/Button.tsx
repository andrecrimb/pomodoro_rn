import React from 'react'
import styled from '@emotion/native'
import { primary } from '../theme'

//#region Props
type ButtonColor = 'primary' | 'default'
type Props = {
  color?: ButtonColor
  onPress: () => void
  title: string
}
//#endregion

export default ({ color = 'default', onPress, title }: Props) => {
  return (
    <Button $color={color} onPress={onPress} underlayColor={primary.dark}>
      <ButtonText>{title}</ButtonText>
    </Button>
  )
}

const ButtonText = styled.Text`
  font-family: ${p => p.theme.font.bold};
  color: ${p => p.theme.text};
  font-size: 16px;
`

const Button = styled.TouchableHighlight<{ $color?: ButtonColor }>`
  align-items: center;
  justify-content: center;
  background-color: ${p => (p.$color === 'primary' ? p.theme.primary.main : p.theme.grey[800])};
  height: 50px;
  border-radius: 16px;
`
