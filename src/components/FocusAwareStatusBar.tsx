import * as React from 'react'
import { StatusBar, StatusBarStyle } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

type Props = {
  backgroundColor?: string
  barStyle?: StatusBarStyle
}
export function FocusAwareStatusBar(props: Props) {
  const isFocused = useIsFocused()

  return isFocused ? <StatusBar {...props} /> : null
}
