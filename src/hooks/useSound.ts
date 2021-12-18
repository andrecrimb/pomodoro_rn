import { Audio } from 'expo-av'
import { useState, useEffect } from 'react'

export default () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null)

  async function playSectionCompleted() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/next_section_sound.wav')
    )
    setSound(sound)

    return await sound.playAsync()
  }

  async function playTimerCompleted() {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/done_sound.wav'))
    setSound(sound)

    return await sound.playAsync()
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return { playSectionCompleted, playTimerCompleted }
}
