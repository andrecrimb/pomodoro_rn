import { useMachine } from '@xstate/react'
import { useMemo } from 'react'
import createTimeTrackerMachine, {
  TimerStates,
  SectionStates
} from '../machines/timeTrackerMachine'
import { Timer } from '../types/timer'
import { MachineContext, MachineEvents } from '../types/timerMachine'

export default (timer: Timer) => {
  const machine = useMemo(() => createTimeTrackerMachine(timer), [])
  const [current, send] = useMachine<MachineContext, MachineEvents>(machine)

  const currState: TimerStates = useMemo(() => {
    if (current.matches(TimerStates.FOCUS)) return TimerStates.FOCUS
    if (current.matches(TimerStates.LONG_BREAK)) return TimerStates.LONG_BREAK
    if (current.matches(TimerStates.SHORT_BREAK)) return TimerStates.SHORT_BREAK
    return TimerStates.DONE
  }, [current.value])

  const paused =
    !current.matches({ [TimerStates.FOCUS]: SectionStates.RUNNING }) &&
    !current.matches({ [TimerStates.SHORT_BREAK]: SectionStates.RUNNING }) &&
    !current.matches({ [TimerStates.LONG_BREAK]: SectionStates.RUNNING })

  const togglePause = () => send(paused ? 'CONTINUE' : 'PAUSE')

  const currInterval = currState !== TimerStates.DONE ? current.context[currState] : null

  return { currState, paused, togglePause, context: current.context, currInterval }
}
