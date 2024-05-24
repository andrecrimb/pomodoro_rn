import React from 'react'
import styled from '@emotion/native'
import { TouchableOpacity, StyleSheet, Vibration } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from 'react-native-reanimated'
import { primary } from '../theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../types/stackParamList'
import { TimerCircle } from '../components/TimerCircle'
import { TimerStates, useTimer } from '../hooks/useTimer'
import useSound from '../hooks/useSound'
import { useKeepAwake } from 'expo-keep-awake'
import { useNavigation } from '@react-navigation/native'

export const RunningTimer = ({
  route: { params: timer }
}: NativeStackScreenProps<HomeStackParamList, 'runningTimer'>) => {
  useKeepAwake()

  const {
    currentState,
    togglePause,
    isPaused,
    sectionTimeout,
    sections,
    currentInterval,
    completedSections
  } = useTimer(timer)

  const navigation = useNavigation()

  const isTimerDone = currentState === TimerStates.DONE

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
    Vibration.vibrate()
    if (currentState === TimerStates.DONE) {
      ;(async function () {
        await playTimerCompleted()
      })()
    } else {
      ;(async function () {
        await playSectionCompleted()
      })()
    }
  }, [currentState])

  const onButtonPress = isTimerDone ? navigation.goBack : togglePause

  return (
    <Wrapper>
      <TimerCircle
        currState={currentState}
        paused={isPaused}
        sections={sections}
        currInterval={currentInterval}
        timeout={sectionTimeout}
        completedSections={completedSections}
      />
      <Animated.View style={[styles.defaultMainButton, animatedButtonStyle]}>
        <TouchableOpacity onPress={onButtonPress}>
          <PlayWrapper>
            {isTimerDone ? (
              <Feather name="check" size={60} color={primary.main} />
            ) : (
              <Ionicons
                name={isPaused ? 'play' : 'pause'}
                size={60}
                style={{ marginLeft: 3 }}
                color={primary.main}
              />
            )}
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
