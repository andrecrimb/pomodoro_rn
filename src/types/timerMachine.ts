import { Timer } from './timer'

type MachineInitializer = Omit<Timer, 'id' | 'name'>

export type MachineInput = {
  contextInitializer: MachineInitializer
}

export type MachineContext = MachineInitializer & {
  completedSections: number
  pausedTime: Date | null
  sectionTimeout: Date | null
}

export type MachineEvents = { type: 'PAUSE' } | { type: 'CONTINUE' } | { type: 'TICK' }
