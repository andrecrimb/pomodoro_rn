import { useSelector } from '@xstate/react'
import { useCallback, useMemo } from 'react'
import { timeTrackerMachine } from '../machines/timeTrackerMachine'
import { Timer } from '../types/timer'
import { createActor } from 'xstate'

export enum TimerStates {
  FOCUS = 'focus',
  SHORT_BREAK = 'shortBreak',
  LONG_BREAK = 'longBreak',
  DONE = 'done'
}

export const useTimer = (timer: Timer) => {
  const timerActor = useMemo(() => {
    return createActor(timeTrackerMachine, {
      input: { contextInitializer: timer }
    })
  }, [timer])

  const isPaused = useSelector(
    timerActor,
    state =>
      state.matches({ FOCUS: 'PAUSED' }) ||
      state.matches({ SHORT_BREAK: 'PAUSED' }) ||
      state.matches({ LONG_BREAK: 'PAUSED' })
  )

  const currentState = useSelector(timerActor, state => {
    if (state.matches('FOCUS')) return TimerStates.FOCUS
    if (state.matches('SHORT_BREAK')) return TimerStates.SHORT_BREAK
    if (state.matches('LONG_BREAK')) return TimerStates.LONG_BREAK
    if (state.matches('DONE')) return TimerStates.DONE
    return null
  })

  const togglePause = useCallback(
    () => timerActor.send(isPaused ? { type: 'PAUSE' } : { type: 'CONTINUE' }),
    [isPaused]
  )

  const currentInterval = useSelector(timerActor, state => {
    if (state.matches('FOCUS')) return state.context.focus
    if (state.matches('SHORT_BREAK')) return state.context.shortBreak
    if (state.matches('LONG_BREAK')) return state.context.longBreak
    return null
  })

  const completedSections = useSelector(timerActor, state => state.context.completedSections)
  const sectionTimeout = useSelector(timerActor, state => state.context.sectionTimeout)
  const sections = useSelector(timerActor, state => state.context.sections)

  return {
    togglePause,
    currentState,
    isPaused,
    currentInterval,
    completedSections,
    sectionTimeout,
    sections
  }
}
