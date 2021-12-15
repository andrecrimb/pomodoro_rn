export type Timer = {
  id: string
  name: string

  focus: number //* focus time (in minutes)
  shortBreak: number //* short break time (in minutes)
  longBreak: number //* long break time (in minutes)
  sections: number
  intervalsForLongBreak: number
}
