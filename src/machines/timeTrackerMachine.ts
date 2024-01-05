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
      /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBbMB9ZAnAhgMYDWYuW6RAFqgHZgB0AZgPaECusAxAMIDyAWQAKAGQCiAFTEARANoAGALqJQABxaxUaFrRUgAHogAcANhMN58gJwBmK-fkAmG44DsjgDQgAnohtGAFgYjAEYAVlcbVyNrENMQgF8ErzRMHAISMgpqOkZWDm5+YXEpORDlJBB1TW1dSsMEQPNLW3srJxd3L18ER3lzAKjLI3sTaKMbAKSUjGw8IlJySkIaemY2Tl5BUUkZWUcKtQ0tVB09BqaLazsHZzdPH0QwsYYrGMnwkLMTO2mQVLmGUW2RWuXWBQYuHYtFodCgXCEAEEAKoAZTECkOVWOtXOiACAVcDDMjjC8iMfRM8jizm6fgiDEJjkGAUcVhM7RCVjCfwB6QWWWWqzyG1gDFU+E4kC2ADkJABJGXIjFKPTVE5ner4wnEkyk8mU6kUmx0hA2eREuwhLlfEbk9omXmzfmZJY5NawKgsXDIABCuDA+GIW2Kuzkqsq6txWsazyurVunQePTCISJI3ab3aRiMqcSyX+zvmrpBwoYnu9foDQch0NhtHhSLRKqxUdOdVADXCjhCDDCAQ5bOekUmppM-deNhJrgCFvsTrSxeBQrBFZ9-sDxHFktg0v4csVysxapx7bxCG7vf7g+5Yxso8eCCpQVzYX8ARi1NcrgXgIFbtBNYABsdCgDcgxDHZSmPSNT01TtjAHeMbnaO4ukfcIghCVkZycIx3GtNxfxdZd3UYECG3ArcoRhOEERRdEYKOGozxjW1HAYVx2XZGwQnkQkwisVxTTZXs4icEx8NMGwySIgs+SXQUyIYCiwOrLcJSlCBZQVJUWxPFj4IMRB2M47ifj4gShJEgJe2sVCTDTXMol4pIC1oFgIDgPQFKBJTALAAyNQ7YyEAAWmZU0IqmeSiz8gCy3yTggujBDegCU0+JsBh-EzRwc0w-oeVixd4tLMEkrFGj6ygFLWLS9CenyqwLFceQpw5Ll7C+H8Sr-EsVzWSrty0uqjIaMIRhy0JSSsZwrDTEJTXNeQGGcQTQjeVxsOeYjFIS1cvXXdSxpCrtrHTQJWRCKcbvCIxTVZcxc2pXiuVndpipmUr-3Kj0jqrTda1ohtTvPa0AjCYIrp7W7eMm01JvMN9Iapdq+K4x0+pI-yyzXQGa003cIDBtizGyxxx0k-pLA-STEaEzjLDTMk3mcKI9rKwbyNAqjSbSkJZoYG6CX7EZ8NssIx2y64ZxzNq9VsGxOd+7mVN59TgZq-nQpui1hcmSGPy2yWRMcDjv1Cb82tcRzAmV7H9r+nnKM1onIB1rsKSCVMImwm6uMFqXH3Z15BlCExCXHVpHBVgblIgHRAtgwyzpMuIWtzPVQkm+xeIex9-Gy0xSXw9q+isSG3ISIA */
      id: 'time_tracker_machine',
      initial: 'FOCUS',
      context: {
        ...initializer,
        completedSections: 0,
        pausedTime: null as Date | null,
        sectionTimeout: null as Date | null
      },
      states: {
        FOCUS: {
          entry: ['setSectionTimeoutFromFocus', 'clearPausedTime'],
          exit: 'increaseCompletedSections',
          initial: 'RUNNING',
          states: {
            RUNNING: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: 'PAUSED' }
            },
            PAUSED: {
              entry: 'setPausedTime',
              on: { CONTINUE: 'RUNNING' }
            }
          },
          on: {
            COMPLETED: [
              {
                target: 'DONE',
                cond: 'sectionsCompleted'
              },
              {
                target: 'LONG_BREAK',
                cond: 'focusCompletedGoToLongBreak'
              },
              {
                target: 'SHORT_BREAK'
              }
            ]
          }
        },
        SHORT_BREAK: {
          entry: ['setSectionTimeoutFromShortBreak', 'clearPausedTime'],
          initial: 'RUNNING',
          states: {
            RUNNING: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: 'PAUSED' }
            },
            PAUSED: {
              entry: 'setPausedTime',
              on: { CONTINUE: 'RUNNING' }
            }
          },
          on: { COMPLETED: 'FOCUS' }
        },
        LONG_BREAK: {
          entry: ['setSectionTimeoutFromLongBreak', 'clearPausedTime'],
          initial: 'RUNNING',
          states: {
            RUNNING: {
              entry: 'setSectionTimeoutFromDiffPausedTime',
              invoke: { id: 'timerInterval', src: 'timerInterval' },
              on: { PAUSE: 'PAUSED' }
            },
            PAUSED: {
              entry: 'setPausedTime',
              on: { CONTINUE: 'RUNNING' }
            }
          },
          on: { COMPLETED: 'FOCUS' }
        },
        DONE: { type: 'final' }
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
