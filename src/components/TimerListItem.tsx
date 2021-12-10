import React from 'react'
import i18n from '../i18n'
import PlayButton from './PlayButton'
import { Octicons } from '@expo/vector-icons'
import { primary } from '../theme'
import Animated from 'react-native-reanimated'
import styled from '@emotion/native'
import { StyleSheet, View } from 'react-native'
import { Timer } from '../types/timer'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../types/stackParamList'

type Props = { item: Timer }
type NavigationProps = NativeStackNavigationProp<HomeStackParamList, 'home'>

export default ({ item }: Props) => {
  const navigation = useNavigation<NavigationProps>()

  return (
    <Animated.View>
      <Cell onPress={() => navigation.push('editTimer', item)}>
        <>
          <View>
            <CellName>{item.name}</CellName>
            <InfoBottom>
              <CellAdditionalInfo>
                {i18n.t('focus')} {i18n.t('x_min', { count: item.focus })}
              </CellAdditionalInfo>
              <Octicons name="primitive-dot" style={styles.dot} size={14} color={primary.main} />
              <CellAdditionalInfo>
                {item.sections} {i18n.t('interval', { count: item.sections })}
              </CellAdditionalInfo>
            </InfoBottom>
          </View>
          <PlayButton onPress={() => navigation.push('runningTimer', { name: item.name })} />
        </>
      </Cell>
    </Animated.View>
  )
}

//#region Styles
const Cell = styled.TouchableOpacity`
  background-color: ${p => p.theme.grey[800]};
  padding: 20px;
  margin: 8px 10px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const InfoBottom = styled.View`
  flex-direction: row;
  margin-top: 16px;
  align-items: center;
`
const CellName = styled.Text`
  color: ${p => p.theme.text};
  font-family: ${p => p.theme.font.bold};
  font-size: 16px;
`
const CellAdditionalInfo = styled.Text`
  color: ${p => p.theme.grey[500]};
  font-family: ${p => p.theme.font[500]};
`
const styles = StyleSheet.create({
  dot: { marginLeft: 10, marginRight: 10 }
})
//#endregion
