jest.useFakeTimers()
//@ts-ignore
import { setUpTests } from 'react-native-reanimated/lib/reanimated2/jestUtils'
setUpTests()

export const reanimatedSetup = () => {
  // in a test setup file, or your test itself
  const FRAME_TIME = 10

  //@ts-ignore
  global.requestAnimationFrame = cb => {
    setTimeout(cb, FRAME_TIME)
  }
}
