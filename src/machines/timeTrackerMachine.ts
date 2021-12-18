import { assign, createMachine } from 'xstate'
import { MachineContext, MachineEvents, MachineInitializer } from '../types/timerMachine'

export enum TimerStates {
  focus = 'focus',
  shortBreak = 'shortBreak',
  longBreak = 'longBreak',
  done = 'done'
}

export enum SectionStates {
  paused = 'paused',
  running = 'running'
}

const createTimeTrackerMachine = (initializer: MachineInitializer) =>
  createMachine<MachineContext, MachineEvents>(
    {
      id: 'time_tracker_machine',
      initial: TimerStates.focus,
      context: {
        ...initializer,
        completedSections: 0,
        pausedTime: null as Date | null,
        sectionTimeout: null as Date | null
      },
      states: {
        [TimerStates.focus]: {
          entry: ['setSectionTimeoutFromFocus', 'clearPausedTime'],
          exit: 'increaseCompletedSections',
          initial: SectionStates.running,
          states: {
            [SectionStates.running]: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: SectionStates.paused }
            },
            [SectionStates.paused]: {
              entry: 'setPausedTime',
              on: { CONTINUE: SectionStates.running }
            }
          },
          on: {
            COMPLETED: [
              {
                target: TimerStates.done,
                cond: 'sectionsCompleted'
              },
              {
                target: TimerStates.longBreak,
                cond: 'focusCompletedGoToLongBreak'
              },
              {
                target: TimerStates.shortBreak
              }
            ]
          }
        },
        [TimerStates.shortBreak]: {
          entry: ['setSectionTimeoutFromShortBreak', 'clearPausedTime'],
          initial: SectionStates.running,
          states: {
            [SectionStates.running]: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: SectionStates.paused }
            },
            [SectionStates.paused]: {
              entry: 'setPausedTime',
              on: { CONTINUE: SectionStates.running }
            }
          },
          on: { COMPLETED: TimerStates.focus }
        },
        [TimerStates.longBreak]: {
          entry: ['setSectionTimeoutFromLongBreak', 'clearPausedTime'],
          initial: SectionStates.running,
          states: {
            [SectionStates.running]: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: SectionStates.paused }
            },
            [SectionStates.paused]: {
              entry: 'setPausedTime',
              on: { CONTINUE: SectionStates.running }
            }
          },
          on: { COMPLETED: TimerStates.focus }
        },
        [TimerStates.done]: { type: 'final' }
      }
    },
    {
      guards: {
        focusCompletedGoToLongBreak: ctx =>
          (ctx.completedSections + 1) % ctx.intervalsForLongBreak === 0,
        sectionsCompleted: ctx => ctx.sections === ctx.completedSections + 1
      },
      actions: {
        setSectionTimeoutFromFocus: assign({
          sectionTimeout: ctx => {
            const newSectionTimeout = new Date()
            newSectionTimeout.setMinutes(newSectionTimeout.getMinutes() + ctx.focus)
            return newSectionTimeout
          }
        }),
        setSectionTimeoutFromLongBreak: assign({
          sectionTimeout: ctx => {
            const newSectionTimeout = new Date()
            newSectionTimeout.setMinutes(newSectionTimeout.getMinutes() + ctx.longBreak)
            return newSectionTimeout
          }
        }),
        setSectionTimeoutFromShortBreak: assign({
          sectionTimeout: ctx => {
            const newSectionTimeout = new Date()
            newSectionTimeout.setMinutes(newSectionTimeout.getMinutes() + ctx.shortBreak)
            return newSectionTimeout
          }
        }),
        setSectionTimeoutFromDiffPausedTime: assign({
          sectionTimeout: ctx => {
            if (!ctx.sectionTimeout || !ctx.pausedTime) {
              return ctx.sectionTimeout
            }

            const sectionTimeLeft = Math.ceil(
              ctx.sectionTimeout.valueOf() - ctx.pausedTime.valueOf()
            )

            const newSectionTimeout = new Date()
            newSectionTimeout.setMilliseconds(newSectionTimeout.getMilliseconds() + sectionTimeLeft)

            return newSectionTimeout
          }
        }),
        clearPausedTime: assign({ pausedTime: ctx => null }),
        setPausedTime: assign({ pausedTime: ctx => new Date() }),
        increaseCompletedSections: assign({
          completedSections: ctx => ctx.completedSections + 1
        })
      },
      services: {
        timerInterval: ctx => cb => {
          const interval = setInterval(() => {
            const now = new Date()
            const timeDiff = ctx.sectionTimeout
              ? Math.ceil((ctx.sectionTimeout.valueOf() - now.valueOf()) / 1000)
              : undefined

            if (timeDiff !== undefined && timeDiff <= 0) {
              cb('COMPLETED')
            }
          }, 1000)
          return () => clearInterval(interval)
        }
      }
    }
  )

export default createTimeTrackerMachine
