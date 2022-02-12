import { assign, createMachine } from 'xstate'
import { MachineContext, MachineEvents, MachineInitializer } from '../types/timerMachine'

export enum TimerStates {
  FOCUS = 'focus',
  SHORT_BREAK = 'shortBreak',
  LONG_BREAK = 'longBreak',
  DONE = 'done'
}

export enum SectionStates {
  PAUSED = 'paused',
  RUNNING = 'running'
}

const createTimeTrackerMachine = (initializer: MachineInitializer) =>
  createMachine<MachineContext, MachineEvents>(
    {
      id: 'time_tracker_machine',
      initial: TimerStates.FOCUS,
      context: {
        ...initializer,
        completedSections: 0,
        pausedTime: null as Date | null,
        sectionTimeout: null as Date | null
      },
      states: {
        [TimerStates.FOCUS]: {
          entry: ['setSectionTimeoutFromFocus', 'clearPausedTime'],
          exit: 'increaseCompletedSections',
          initial: SectionStates.RUNNING,
          states: {
            [SectionStates.RUNNING]: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: SectionStates.PAUSED }
            },
            [SectionStates.PAUSED]: {
              entry: 'setPausedTime',
              on: { CONTINUE: SectionStates.RUNNING }
            }
          },
          on: {
            COMPLETED: [
              {
                target: TimerStates.DONE,
                cond: 'sectionsCompleted'
              },
              {
                target: TimerStates.LONG_BREAK,
                cond: 'focusCompletedGoToLongBreak'
              },
              {
                target: TimerStates.SHORT_BREAK
              }
            ]
          }
        },
        [TimerStates.SHORT_BREAK]: {
          entry: ['setSectionTimeoutFromShortBreak', 'clearPausedTime'],
          initial: SectionStates.RUNNING,
          states: {
            [SectionStates.RUNNING]: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: SectionStates.PAUSED }
            },
            [SectionStates.PAUSED]: {
              entry: 'setPausedTime',
              on: { CONTINUE: SectionStates.RUNNING }
            }
          },
          on: { COMPLETED: TimerStates.FOCUS }
        },
        [TimerStates.LONG_BREAK]: {
          entry: ['setSectionTimeoutFromLongBreak', 'clearPausedTime'],
          initial: SectionStates.RUNNING,
          states: {
            [SectionStates.RUNNING]: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: SectionStates.PAUSED }
            },
            [SectionStates.PAUSED]: {
              entry: 'setPausedTime',
              on: { CONTINUE: SectionStates.RUNNING }
            }
          },
          on: { COMPLETED: TimerStates.FOCUS }
        },
        [TimerStates.DONE]: { type: 'final' }
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
