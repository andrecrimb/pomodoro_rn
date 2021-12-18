import { asEffect, useMachine } from '@xstate/react'
import { useMemo } from 'react'
import createTimeTrackerMachine, {
  TimerStates,
  SectionStates
} from '../machines/timeTrackerMachine'
import { Timer } from '../types/timer'
import { MachineContext, MachineEvents } from '../types/timerMachine'

export type States = keyof typeof TimerStates

export default (timer: Timer) => {
  const machine = useMemo(() => createTimeTrackerMachine(timer), [])
  const [current, send] = useMachine<MachineContext, MachineEvents>(machine)

  const currState: States = useMemo(() => {
    if (current.matches(TimerStates.focus)) return TimerStates.focus
    if (current.matches(TimerStates.longBreak)) return TimerStates.longBreak
    if (current.matches(TimerStates.shortBreak)) return TimerStates.shortBreak
    return TimerStates.done
  }, [current.value])

  const paused =
    !current.matches({ [TimerStates.focus]: SectionStates.running }) &&
    !current.matches({ [TimerStates.shortBreak]: SectionStates.running }) &&
    !current.matches({ [TimerStates.longBreak]: SectionStates.running })

  const togglePause = () => send(paused ? 'CONTINUE' : 'PAUSE')

  const currInterval = currState !== 'done' ? current.context[currState] : null

  return { currState, paused, togglePause, context: current.context, currInterval }
}
