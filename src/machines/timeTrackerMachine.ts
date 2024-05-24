import { assign, setup, fromCallback, CallbackActorLogic, and } from 'xstate'
import { MachineContext, MachineEvents, MachineInput, MachineSection } from '../types/timerMachine'
import dayjs from 'dayjs'

const tickInterval: CallbackActorLogic<MachineEvents> = fromCallback<MachineEvents>(
  ({ sendBack }) => {
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
      !!(context.sectionTimeout && dayjs().toDate().valueOf() >= context.sectionTimeout.valueOf()),
    focusCompletedGoToLongBreak: ({ context }) =>
      (context.completedSections + 1) % context.intervalsForLongBreak === 0,
    sectionsCompleted: ({ context }) => context.sections === context.completedSections + 1
  },
  actions: {
    setSectionTimeout: assign({
      sectionTimeout: ({ context }, params: { from: MachineSection }) => {
        switch (params.from) {
          case MachineSection.FOCUS:
            return dayjs().add(context.focus, 'minute').toDate()
          case MachineSection.LONG_BREAK:
            return dayjs().add(context.longBreak, 'minute').toDate()
          case MachineSection.SHORT_BREAK:
            return dayjs().add(context.shortBreak, 'minute').toDate()
          case MachineSection.PAUSED:
            if (!context.sectionTimeout || !context.pausedTime) {
              return context.sectionTimeout
            }
            const millisecondsPaused = dayjs().diff(context.pausedTime, 'ms')
            return dayjs(context.sectionTimeout).add(millisecondsPaused, 'ms').toDate()
          default:
            return context.sectionTimeout
        }
      }
    }),
    clearPausedTime: assign({ pausedTime: null }),
    setPausedTime: assign({ pausedTime: () => dayjs().toDate() }),
    increaseCompletedSections: assign({
      completedSections: ({ context }) => context.completedSections + 1
    })
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMB9ZAnAhgMYDWYuAdAGIDyAwgKoDK5ASvQHLsCS7A4gMQAFAIJMAogG0ADAF1EoAA4B7WKjRKAdvJAAPRACYALIfIBGAJwB2AMyH9VwwA5bxgDQgAnogCspqeW9zQwA2b2DrKW9LR0dLYIBfePc0TBwCEjIqOiZWDm4+fgAVLloAaWk5JBBlVXUtKr0EfX1rcn1HU0tI807vDst3LwRHFrMpYKD7Fu99S31E5IxsPCJSChoGZjZOHgFisolTSsUVNVRNbUbzKVNyKSkgwO97zvtBg1DyDtjoqPNgwymRyGBYgFLLdJrLKbXI7Ar7cr6Y7VU51S6Ia63e6PczPG5zczvBChbxffQPKSzaxhFqmUHgtKrTIbHIicQAEX4tGo7GK7Hoklk2hqZwuDQMxjMVls9ksThchiJIX8vms1kck2swS61npS0ZGQojAAEtQWIUsAAhFhiYSlWH5ARsxiC5EitHihCmbyGSzkczXaJarq0ok2fwPRw3bwRYLBfTePWpFaG8gms0W622+3bR1FErlIVVd3neqgRozIl+OzkbURUyzQzmWxWJMQplG03mq02u3kZ1iTnc3k8AUVYWo0vor0+v0BqRB7WU6ymInBKN3Uzapx2QzPUJtg1QgAyPN4PezDt2QlELvHxcnYvLiG9zXI1iDL1Mvri1iJtgjXFYiMYNAUPFMTzPC8+1za8EXvE5ainT14yJDo7mbOURijSxAkcRMkjBfUIMyU8+Gg+0ByHHk+THItENFMtdBfGZ9HfT8bm-SxfyJewI2-YJIm8H14wTBJQQ0JQIDgbQGRI3AJyQp9mIQABaBM-RCGZTGDSwtxuRVPEQVTSQDMyE2MXc1XAyFmWyRhFMY6d1IecgtP0HTtT0wTv147VaziZxrnjOJohsjtoRyWC+Ecj1nzUrdbnczzuP03yjIQPdzC+GxZW9HTxnMcLUxZZgqNi5D4vVUzEqkQw6v0YJvTiJUY3fPpOj03DgSagjFmTWzOwzCiKuUxpTAbExrHaZouiBFpQiJVUzFSuMohuXFxP69tU3TbssxgvJdlGpjxted8ZtmG4Ri1bw1x6AJ-l9fS5US4qoT2zNe0o29BxO6ctw1cgulxYwbCjBs7oy7U2McXqtU6OMRhBQi5MG8gyPPA7Sn+z0-HMRxgeawxbBCjpgirUZegawE7G-WZ3tIqDsavGKHyU06XwEomohJkJZnJ-8bkekn2hsXDprpVHiPRzGKP7X72Vx+KtwBDCuia+bhJajKZq+QJAXJck5ql7aj0ydkeTEZWVL8YEAgNoJ1yMQIBgy8wPJWj2RiBWISYIxIgA */
  id: 'time_tracker',
  initial: 'FOCUS',
  context: ({ input }) => ({
    ...input.contextInitializer,
    completedSections: 0,
    pausedTime: null as Date | null,
    sectionTimeout: null as Date | null
  }),
  states: {
    FOCUS: {
      entry: [
        { type: 'setSectionTimeout', params: { from: MachineSection.FOCUS } },
        'clearPausedTime'
      ],
      exit: 'increaseCompletedSections',
      initial: 'RUNNING',
      states: {
        RUNNING: {
          entry: { type: 'setSectionTimeout', params: { from: MachineSection.PAUSED } },
          invoke: { src: 'tickInterval' },
          on: {
            PAUSE: 'PAUSED',
            TICK: [
              {
                target: '#time_tracker.DONE',
                guard: and(['isTimeout', 'sectionsCompleted'])
              },
              {
                target: '#time_tracker.LONG_BREAK',
                guard: and(['isTimeout', 'focusCompletedGoToLongBreak'])
              },
              {
                target: '#time_tracker.SHORT_BREAK',
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
      entry: [
        { type: 'setSectionTimeout', params: { from: MachineSection.SHORT_BREAK } },
        'clearPausedTime'
      ],
      initial: 'RUNNING',
      states: {
        RUNNING: {
          entry: { type: 'setSectionTimeout', params: { from: MachineSection.PAUSED } },
          invoke: { src: 'tickInterval' },
          on: {
            PAUSE: 'PAUSED',
            TICK: {
              target: '#time_tracker.FOCUS',
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
      entry: [
        { type: 'setSectionTimeout', params: { from: MachineSection.LONG_BREAK } },
        'clearPausedTime'
      ],
      initial: 'RUNNING',
      states: {
        RUNNING: {
          entry: { type: 'setSectionTimeout', params: { from: MachineSection.PAUSED } },
          invoke: { src: 'tickInterval' },
          on: {
            PAUSE: 'PAUSED',
            TICK: {
              target: '#time_tracker.FOCUS',
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
