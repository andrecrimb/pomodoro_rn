import { Timer } from './timer'

export type MachineInitializer = Omit<Timer, 'id' | 'name'>

export type MachineContext = MachineInitializer & {
  completedSections: number
  pausedTime: Date | null
  sectionTimeout: Date | null
}

export type MachineEvents = { type: 'COMPLETED' } | { type: 'PAUSE' } | { type: 'CONTINUE' }
