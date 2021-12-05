import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default (props: { children: React.ReactNode }) => {
  return <SafeAreaView style={styles.safeArea}>{props.children}</SafeAreaView>
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 }
})
