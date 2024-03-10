import { assign, setup, fromCallback, CallbackActorLogic, and } from 'xstate'
import { MachineContext, MachineEvents, MachineInput } from '../types/timerMachine'

const tickInterval: CallbackActorLogic<MachineEvents> = fromCallback<MachineEvents>(
  ({ sendBack, receive }) => {
    const interval = setInterval(() => {
      sendBack({ type: 'TICK' })
    }, 1000)
    return () => clearInterval(interval)
  }
)

export const timeTrackerMachine = setup({
  types: {
    context: {} as MachineContext,
    events: {} as MachineEvents,
    input: {} as MachineInput
  },
  actors: {
    tickInterval
  },
  guards: {
    isTimeout: ({ context }) =>
      !!(context.sectionTimeout && new Date().valueOf() >= context.sectionTimeout.valueOf()),
    focusCompletedGoToLongBreak: ({ context }) =>
      (context.completedSections + 1) % context.intervalsForLongBreak === 0,
    sectionsCompleted: ({ context }) => context.sections === context.completedSections + 1
  },
  actions: {
    setSectionTimeoutFromFocus: assign({
      sectionTimeout: ({ context }) => {
        const newSectionTimeout = new Date()
        newSectionTimeout.setMinutes(newSectionTimeout.getMinutes() + context.focus)
        return newSectionTimeout
      }
    }),
    setSectionTimeoutFromLongBreak: assign({
      sectionTimeout: ({ context }) => {
        const newSectionTimeout = new Date()
        newSectionTimeout.setMinutes(newSectionTimeout.getMinutes() + context.longBreak)
        return newSectionTimeout
      }
    }),
    setSectionTimeoutFromShortBreak: assign({
      sectionTimeout: ({ context }) => {
        const newSectionTimeout = new Date()
        newSectionTimeout.setMinutes(newSectionTimeout.getMinutes() + context.shortBreak)
        return newSectionTimeout
      }
    }),
    setSectionTimeoutFromDiffPausedTime: assign({
      sectionTimeout: ({ context }) => {
        if (!context.sectionTimeout || !context.pausedTime) {
          return context.sectionTimeout
        }

        const sectionTimeLeft = Math.ceil(
          context.sectionTimeout.valueOf() - context.pausedTime.valueOf()
        )

        const newSectionTimeout = new Date()
        newSectionTimeout.setMilliseconds(newSectionTimeout.getMilliseconds() + sectionTimeLeft)

        return newSectionTimeout
      }
    }),
    clearPausedTime: assign({ pausedTime: null }),
    setPausedTime: assign({ pausedTime: new Date() }),
    increaseCompletedSections: assign({
      completedSections: ({ context }) => context.completedSections + 1
    })
  }
}).createMachine({
  id: 'time_tracker_machine',
  initial: 'FOCUS',
  context: ({ input }) => ({
    ...input.contextInitializer,
    completedSections: 0,
    pausedTime: null as Date | null,
    sectionTimeout: null as Date | null
  }),
  states: {
    FOCUS: {
      entry: ['setSectionTimeoutFromFocus', 'clearPausedTime'],
      exit: 'increaseCompletedSections',
      initial: 'RUNNING',
      states: {
        RUNNING: {
          entry: 'setSectionTimeoutFromDiffPausedTime',
          invoke: { src: 'tickInterval' },
          on: {
            PAUSE: 'PAUSED',
            TICK: [
              {
                target: 'DONE',
                guard: and(['isTimeout', 'sectionsCompleted'])
              },
              {
                target: 'LONG_BREAK',
                guard: and(['isTimeout', 'focusCompletedGoToLongBreak'])
              },
              {
                target: 'SHORT_BREAK',
                guard: 'isTimeout'
              }
            ]
          }
        },
        PAUSED: {
          entry: 'setPausedTime',
          on: { CONTINUE: 'RUNNING' }
        }
      }
    },
    SHORT_BREAK: {
      entry: ['setSectionTimeoutFromShortBreak', 'clearPausedTime'],
      initial: 'RUNNING',
      states: {
        RUNNING: {
          entry: 'setSectionTimeoutFromDiffPausedTime',
          invoke: { src: 'tickInterval' },
          on: {
            PAUSE: 'PAUSED',
            TICK: {
              target: 'FOCUS',
              guard: 'isTimeout'
            }
          }
        },
        PAUSED: {
          entry: 'setPausedTime',
          on: { CONTINUE: 'RUNNING' }
        }
      }
    },
    LONG_BREAK: {
      entry: ['setSectionTimeoutFromLongBreak', 'clearPausedTime'],
      initial: 'RUNNING',
      states: {
        RUNNING: {
          entry: 'setSectionTimeoutFromDiffPausedTime',
          invoke: { src: 'tickInterval' },
          on: {
            PAUSE: 'PAUSED',
            TICK: {
              target: 'FOCUS',
              guard: 'isTimeout'
            }
          }
        },
        PAUSED: {
          entry: 'setPausedTime',
          on: { CONTINUE: 'RUNNING' }
        }
      }
    },
    DONE: { type: 'final' }
  }
})
