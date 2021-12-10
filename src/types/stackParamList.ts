import { Timer } from './timer'

export type HomeStackParamList = {
  runningTimer: { name: string }
  home: undefined
  newTimer: undefined
  editTimer: Timer
}
