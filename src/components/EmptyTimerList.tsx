import React from 'react'
import styled from '@emotion/native'
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { grey } from '../theme'
import i18n from '../i18n'
import { AntDesign } from '@expo/vector-icons'

export default () => {
  const animatedArrowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: withRepeat(
            withSequence(withTiming(100, { duration: 800 }), withTiming(50, { duration: 500 })),
            -1,
            true
          )
        }
      ]
    }),
    []
  )
  return (
    <Wrapper>
      <TextMessage>{i18n.t('create_first_timer')}</TextMessage>
      <Animated.View style={animatedArrowStyle}>
        <AntDesign name="arrowdown" size={60} color={grey[500]} />
      </Animated.View>
    </Wrapper>
  )
}

//#region Styles
const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`
const TextMessage = styled.Text`
  color: ${p => p.theme.grey[500]};
  width: 80%;
  text-align: center;
  line-height: 50px;
  font-size: 28px;
  margin-top: 40px;
  font-family: ${p => p.theme.font[500]};
`
//#endregion
