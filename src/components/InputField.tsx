import React from 'react'
import styled from '@emotion/native'
import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData } from 'react-native'
import { grey } from '../theme'
import { MaterialIcons } from '@expo/vector-icons'
import i18n from '../i18n'

type Props = {
  placeholder: string
  autoFocus?: boolean
  onChangeText: (text: string) => void
  onBlur: (ev: NativeSyntheticEvent<TextInputFocusEventData>) => void
  value: string
  error?: string
}

export default ({
  placeholder,
  autoFocus = false,
  onChangeText,
  onBlur,
  value,
  error = ''
}: Props) => {
  return (
    <>
      <Wrapper $error={!!error}>
        <TextField
          placeholderTextColor={grey[500]}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
        />
        <MaterialIcons name="mode-edit" style={styles.icon} size={24} color={grey[500]} />
      </Wrapper>
      {error !== '' ? <ErrorText>{i18n.t(error)}</ErrorText> : null}
    </>
  )
}

//#region Styles
const Wrapper = styled.View<{ $error?: boolean }>`
  background-color: ${p => p.theme.grey[800]};
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  border: ${p => (p.$error ? `3px solid ${p.theme.danger}` : 'none')};
`
const TextField = styled.TextInput`
  font-size: 16px;
  font-family: ${p => p.theme.font.bold};
  color: ${p => p.theme.text};
  font-size: 16px;
  flex: 1;
  padding: 20px;
  font-weight: normal;
`
const ErrorText = styled.Text`
  color: ${p => p.theme.danger};
  font-size: 14px;
  font-family: ${p => p.theme.font[500]};
  margin-left: 10px;
  margin-top: 10px;
`
const styles = StyleSheet.create({
  icon: { marginLeft: 16, marginRight: 20 }
})

//#endregion
