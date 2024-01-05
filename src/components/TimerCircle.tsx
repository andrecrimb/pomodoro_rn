import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import { font, primary } from '../theme'
import { ReText } from 'react-native-redash'
import useInterval from '../hooks/useInterval'
import i18n from '../i18n'
import { convertMillisecondsToTimeout } from '../utils'
import { TimerStates } from '../machines/timeTrackerMachine'

type Props = {
  timeout: Date | null
  sections: number
  completedSections: number
  currInterval: number | null
  paused: boolean
  currState: TimerStates
}

const { width } = Dimensions.get('window')
const size = width - 90
const strokeWidth = 20
const r = (size - strokeWidth) / 2
const cx = size / 2
const cy = size / 2
const circumference = r * 2 * Math.PI

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default ({
  timeout,
  currState,
  completedSections,
  currInterval,
  sections,
  paused
}: Props) => {
  const circleProgress = useSharedValue(0)
  const timeLeft = useSharedValue('')

  const animatedProps = useAnimatedProps(
    () => ({
      strokeDashoffset: circumference * circleProgress.value
    }),
    []
  )

  useInterval(
    () => {
      if (timeout && currInterval) {
        const now = new Date()
        const diff = Math.ceil((timeout.valueOf() - now.valueOf()) / 1000)

        const interpolatedValue = interpolate(diff, [currInterval * 60, 0], [0, 1])
        circleProgress.value = withTiming(interpolatedValue)

        timeLeft.value = convertMillisecondsToTimeout(diff)
      }
    },
    !paused && currInterval ? 1000 : null
  )

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoWrapper}>
        <ReText style={styles.countdown} text={timeLeft} />
        <Text style={styles.infoLabel}>
          {currState === 'focus'
            ? i18n.t('round_x_of_y', { x: completedSections + 1, y: sections })
            : ''}
          {currState === 'shortBreak' ? i18n.t('short_break') : ''}
          {currState === 'longBreak' ? i18n.t('long_break') : ''}
          {currState === 'done' ? i18n.t('completed') : ''}
        </Text>
      </View>
      <Svg style={styles.svg}>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={primary.dark}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill={'transparent'}
        />
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={r}
          stroke={primary.light}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill={'transparent'}
        />
      </Svg>
    </View>
  )
}

//#region Styles
const styles = StyleSheet.create({
  svg: {
    width: size,
    height: size,
    position: 'absolute',
    transform: [{ rotate: '-90deg' }]
  },
  wrapper: {
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  countdown: {
    color: '#fff',
    fontSize: 42,
    fontFamily: font.bold,
    width: size,
    textAlign: 'center'
  },
  infoLabel: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    fontFamily: font[500]
  }
})
//#endregion
