import React from 'react'
import { Timer } from '../types/timer'

const TimersContext = React.createContext<Timer[]>([])
const TimersActionsContext = React.createContext<React.Dispatch<React.SetStateAction<Timer[]>>>(
  undefined as any
)

const TimersProvider = ({ children }: { children: React.ReactNode }) => {
  const [timers, setTimer] = React.useState<Timer[]>([])
  return (
    <TimersContext.Provider value={timers}>
      <TimersActionsContext.Provider value={setTimer}>{children}</TimersActionsContext.Provider>
    </TimersContext.Provider>
  )
}

export { TimersActionsContext, TimersContext, TimersProvider }
