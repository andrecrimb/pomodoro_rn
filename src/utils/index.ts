export const uniqueID = () => '_' + Math.random().toString(36).slice(2, 9)

export const createArr = (length: number, startIndex: number = 1, space: number = 1) => {
  const arr: number[] = []

  for (let i = startIndex; i <= length; i += space) {
    arr.push(i)
  }
  return arr
}

export function convertSecondsToTimeout(secondsLeft: number) {
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = Math.floor(secondsLeft % 60)

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds

  return `${formattedMinutes}:${formattedSeconds}`
}
