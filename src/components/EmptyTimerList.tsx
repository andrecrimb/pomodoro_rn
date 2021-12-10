import React from 'react'
import styled from '@emotion/native'
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring
} from 'react-native-reanimated'
import { grey, primary } from '../theme'
import i18n from '../i18n'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'

export default () => {
  const animatedArrowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: withRepeat(withSequence(withSpring(100), withSpring(50)), -1, true)
        }
      ]
    }),
    []
  )
  return (
    <Wrapper>
      <MaterialIcons name="timer" size={110} color={grey[500]} />
      <TextMessage>{i18n.t('create_first_timer')}</TextMessage>
      <Animated.View style={[styles.arrowWrapper, animatedArrowStyle]}>
        <Entypo name="arrow-down" size={70} color={primary.light} />
      </Animated.View>
    </Wrapper>
  )
}

//#region Styles
const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 500px;
`
const TextMessage = styled.Text`
  color: ${p => p.theme.grey[500]};
  width: 80%;
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  margin-top: 40px;
  font-family: ${p => p.theme.font.bold};
`
const styles = StyleSheet.create({
  arrowWrapper: {
    position: 'absolute',
    bottom: 0
  }
})
//#endregion
