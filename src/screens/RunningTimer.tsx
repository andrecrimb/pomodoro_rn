import React from 'react'
import styled from '@emotion/native'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from 'react-native-reanimated'
import { primary } from '../theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../types/stackParamList'
import TimerCircle from '../components/TimerCircle'
import useTimerMachine from '../hooks/useTimerMachine'
import useSound from '../hooks/useSound'

export default ({
  route: { params: timer }
}: NativeStackScreenProps<HomeStackParamList, 'runningTimer'>) => {
  const { currState, togglePause, paused, context, currInterval } = useTimerMachine(timer)
  const { playSectionCompleted, playTimerCompleted } = useSound()

  const scale = useSharedValue(0)

  const animatedButtonStyle = useAnimatedStyle(
    () => ({ transform: [{ scale: withDelay(100, withSpring(scale.value)) }] }),
    []
  )

  React.useEffect(() => {
    scale.value = 1
  }, [])

  React.useEffect(() => {
    if (currState === 'done') {
      ;(async function () {
        await playTimerCompleted()
      })()
    } else {
      ;(async function () {
        await playSectionCompleted()
      })()
    }
  }, [currState])

  const onPause = () => togglePause()

  return (
    <Wrapper>
      <TimerCircle
        currState={currState}
        paused={paused}
        sections={context.sections}
        currInterval={currInterval}
        timeout={context.sectionTimeout}
        completedSections={context.completedSections}
      />
      <Animated.View style={[styles.defaultMainButton, animatedButtonStyle]}>
        <TouchableOpacity onPress={onPause}>
          <PlayWrapper>
            <Ionicons
              name={paused ? 'play' : 'pause'}
              size={60}
              style={{ marginLeft: 3 }}
              color={primary.main}
            />
          </PlayWrapper>
        </TouchableOpacity>
      </Animated.View>
    </Wrapper>
  )
}

//#region Styles
const styles = StyleSheet.create({
  defaultMainButton: { marginTop: 70, transform: [{ scale: 0 }] }
})
const Wrapper = styled.View`
  background-color: ${p => p.theme.primary.main};
  flex: 1;
  align-items: center;
  justify-content: center;
`
const PlayWrapper = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 60px;
`

//#endregion
