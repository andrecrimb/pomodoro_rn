import React from 'react'
import i18n from '../i18n'
import PlayButton from './PlayButton'
import { Octicons } from '@expo/vector-icons'
import { grey, primary } from '../theme'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated'
import styled from '@emotion/native'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Timer } from '../types/timer'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../types/stackParamList'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import DeleteButton from './DeleteButton'
import useTimers from '../hooks/useTimers'
import * as Haptics from 'expo-haptics'

const { width } = Dimensions.get('window')
const optionsWidth = 95

type Props = { item: Timer }
type NavigationProps = NativeStackNavigationProp<HomeStackParamList, 'home'>

export default ({ item }: Props) => {
  const { removeTimer } = useTimers()

  const navigation = useNavigation<NavigationProps>()
  const translateX = useSharedValue(0)
  const scale = useSharedValue(0)
  const optionsOpen = useSharedValue(false)

  const cellAnimStyles = useAnimatedStyle(
    () => ({ transform: [{ translateX: translateX.value }] }),
    []
  )

  const deleteBtnAnimStyles = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }), [])

  const onDeleteSwipe = React.useCallback(
    (timerId: string) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      removeTimer(timerId)
    },
    [removeTimer]
  )

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >(
    {
      onStart: (_, ctx: any) => {
        ctx.x = translateX.value
      },
      onActive: (ev, ctx) => {
        const newX = ctx.x + ev.translationX
        translateX.value = newX >= 0 ? 0 : newX

        scale.value = interpolate(newX, [40, -100], [0.1, 1])
      },
      onEnd: ev => {
        scale.value = withTiming(
          interpolate(translateX.value, [40, -100], [0.1, 1], {
            extrapolateRight: Extrapolate.CLAMP
          })
        )

        //* User fully swipe to delete
        if (translateX.value < -width / 2) {
          translateX.value = withTiming(-width, { duration: 200 }, () =>
            runOnJS(onDeleteSwipe)(item.id)
          )
          return
        }

        if (!optionsOpen.value && translateX.value > -width) {
          translateX.value = withSpring(-optionsWidth, { velocity: ev.velocityX }, () => {
            optionsOpen.value = true
          })
          return
        }

        if (optionsOpen.value) {
          if (translateX.value > -optionsWidth) {
            translateX.value = withSpring(0, { velocity: ev.velocityX }, () => {
              optionsOpen.value = false
            })
          } else {
            translateX.value = withSpring(-optionsWidth, { velocity: ev.velocityX })
          }
        }
      }
    },
    [onDeleteSwipe]
  )

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.cell, cellAnimStyles]}>
          <Cell onPress={() => navigation.push('editTimer', item)} underlayColor={grey[700]}>
            <>
              <View>
                <CellName>{item.name}</CellName>
                <InfoBottom>
                  <CellAdditionalInfo>
                    {i18n.t('focus')} {i18n.t('x_min', { count: item.focus })}
                  </CellAdditionalInfo>
                  <Octicons
                    name="primitive-dot"
                    style={styles.dot}
                    size={14}
                    color={primary.main}
                  />
                  <CellAdditionalInfo>
                    {item.sections} {i18n.t('interval', { count: item.sections })}
                  </CellAdditionalInfo>
                </InfoBottom>
              </View>
              <PlayButton onPress={() => navigation.push('runningTimer', item)} />
            </>
          </Cell>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.deleteBtn, deleteBtnAnimStyles]}>
        <DeleteButton onPress={() => removeTimer(item.id)} />
      </Animated.View>
    </>
  )
}

//#region Styles
const Cell = styled.TouchableHighlight`
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
  dot: { marginLeft: 10, marginRight: 10 },
  cell: { zIndex: 2 },
  deleteBtn: {
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 30,
    transform: [{ scale: 0.1 }]
  }
})
//#endregion
