import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { useCallback, useEffect } from 'react'

export const setupAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true
    })
  } catch (error) {
    // send error to crashlytics
  }
}

const soundFile = {
  sectionCompleted: require('../../assets/sounds/next_section_sound.wav'),
  timerCompleted: require('../../assets/sounds/done_sound.wav')
}

const playSound = async (sound: 'sectionCompleted' | 'timerCompleted') => {
  const audioSound = await Audio.Sound.createAsync(soundFile[sound], { shouldPlay: true })
  audioSound.sound.setOnPlaybackStatusUpdate(async status => {
    if (status.isLoaded && status.didJustFinish) {
      await audioSound.sound.unloadAsync()
    }
  })
}

export default () => {
  useEffect(() => {
    setupAudio()
  }, [])

  const playSectionCompleted = useCallback(async () => {
    await playSound('sectionCompleted')
  }, [])

  const playTimerCompleted = useCallback(async () => {
    await playSound('timerCompleted')
  }, [])

  return { playSectionCompleted, playTimerCompleted }
}
