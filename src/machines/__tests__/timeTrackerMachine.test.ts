import { interpret } from 'xstate'
import createTimeTrackerMachine from '../timeTrackerMachine'
import { advanceBy } from 'jest-date-mock'

const initialValues = {
  focus: 40,
  shortBreak: 5,
  longBreak: 15,
  sections: 4,
  intervalsForLongBreak: 3
}

describe('test machine through events directly', () => {
  it('should reach "focus.paused/running" given "PAUSE/CONTINUE" events occurs', () => {
    const machine = createTimeTrackerMachine(initialValues)

    const service = interpret(machine).start()

    //* focus time running
    expect(service.state.matches('focus.running')).toBeTruthy()

    //* paused focus time
    service.send('PAUSE')
    expect(service.state.matches('focus.paused')).toBeTruthy()

    //* continue focus time
    service.send('CONTINUE')
    expect(service.state.matches('focus.running')).toBeTruthy()
  })

  it('should reach "longBreak.paused/running" given "PAUSE/CONTINUE" events occurs', () => {
    const machine = createTimeTrackerMachine(initialValues)

    //* focus time running
    const pausedStepState = machine.transition('longBreak.running', 'PAUSE')
    expect(pausedStepState.matches('longBreak.paused')).toBeTruthy()

    //* paused focus time
    const runningStepState = machine.transition('longBreak.paused', 'CONTINUE')
    expect(runningStepState.matches('longBreak.running')).toBeTruthy()
  })

  it('should reach "shortBreak.paused/running" given "PAUSE/CONTINUE" events occurs', () => {
    const machine = createTimeTrackerMachine(initialValues)

    //* focus time running
    const pausedStepState = machine.transition('shortBreak.running', 'PAUSE')
    expect(pausedStepState.matches('shortBreak.paused')).toBeTruthy()

    //* paused focus time
    const runningStepState = machine.transition('shortBreak.paused', 'CONTINUE')
    expect(runningStepState.matches('shortBreak.running')).toBeTruthy()
  })

  it('should reach "shortBreak" given "COMPLETED" event occurs', () => {
    const machine = createTimeTrackerMachine(initialValues)

    const pausedStepState = machine.transition('focus', 'COMPLETED')

    expect(pausedStepState.matches('shortBreak.running')).toBeTruthy()
  })

  it('from "shortBreak" should reach "focus" given "COMPLETED" event occurs', () => {
    const machine = createTimeTrackerMachine(initialValues)

    const stepState = machine.transition('shortBreak.running', 'COMPLETED')

    expect(stepState.matches('focus.running')).toBeTruthy()
  })

  it('should reach "longBreak" given "COMPLETED" event occurs', () => {
    const machine = createTimeTrackerMachine(initialValues)

    const pausedStepState = machine.transition('focus', 'COMPLETED', {
      ...machine.context,
      completedSections: 2
    })

    expect(pausedStepState.matches('longBreak.running')).toBeTruthy()
  })

  it('from "longBreak" should reach "focus" given "COMPLETED" event occurs', () => {
    const machine = createTimeTrackerMachine(initialValues)

    const pausedStepState = machine.transition('longBreak.running', 'COMPLETED')

    expect(pausedStepState.matches('focus.running')).toBeTruthy()
  })

  it('should reach automatically "done" given "COMPLETED" event occurs and sections are completed', () => {
    const machine = createTimeTrackerMachine(initialValues)

    const pausedStepState = machine.transition('focus.running', 'COMPLETED', {
      ...machine.context,
      completedSections: 3
    })

    expect(pausedStepState.matches('done')).toBeTruthy()
  })
})

describe('test machine through services', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('from "shortBreak" should reach "focus" after 5 minutes', () => {
    jest.useFakeTimers()

    const machine = createTimeTrackerMachine({
      focus: 40,
      shortBreak: 5,
      longBreak: 15,
      sections: 3,
      intervalsForLongBreak: 2
    })

    const service = interpret(machine).start()

    //* initial state is shortBreak.running
    expect(service.state.matches('focus')).toBeTruthy()

    //* advance time in 40 min
    advanceBy(1000 * 60 * 40)
    jest.advanceTimersToNextTimer()

    //* shortBreak reached
    expect(service.state.matches('shortBreak')).toBeTruthy()

    //* advance time in 5 min
    advanceBy(1000 * 60 * 5)
    jest.advanceTimersToNextTimer()

    //* focus reached again reached
    expect(service.state.matches('focus')).toBeTruthy()

    //* advance time in 40 min
    advanceBy(1000 * 60 * 40)
    jest.advanceTimersToNextTimer()

    //* longBreak reached
    expect(service.state.matches('longBreak')).toBeTruthy()

    //* advance time in 15 min
    advanceBy(1000 * 60 * 15)
    jest.advanceTimersToNextTimer()

    //* focus reached again
    expect(service.state.matches('focus')).toBeTruthy()

    //* advance time in 40 min
    advanceBy(1000 * 60 * 40)
    jest.advanceTimersToNextTimer()

    expect(service.state.matches('done')).toBeTruthy()
  })
})
