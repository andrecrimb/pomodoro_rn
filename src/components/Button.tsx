import React from 'react'
import styled from '@emotion/native'
import { primary } from '../theme'

//#region Props
type ButtonColor = 'primary' | 'default'
type Props = {
  color?: ButtonColor
  onPress: () => void
  title: string
  disabled?: boolean
}
//#endregion

export default ({ color = 'default', onPress, title, disabled = false }: Props) => {
  return (
    <Button disabled={disabled} $color={color} onPress={onPress} underlayColor={primary.dark}>
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
  opacity: ${p => (p.disabled ? '0.5' : 1)};
  height: 50px;
  border-radius: 16px;
`
