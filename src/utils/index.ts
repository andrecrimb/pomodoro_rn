export const uniqueID = () => '_' + Math.random().toString(36).slice(2, 9)

export const createArr = (length: number, startIndex: number = 1, space: number = 1) => {
  const arr: number[] = []

  for (let i = startIndex; i <= length; i += space) {
    arr.push(i)
  }
  return arr
}

export function convertMillisecondsToTimeout(secondsLeft: number) {
  let minutes, seconds, total_minutes, total_seconds

  total_seconds = secondsLeft
  total_minutes = Math.floor(total_seconds / 60)

  seconds = total_seconds % 60
  minutes = total_minutes % 60

  if (minutes > 0)
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`

  return `${seconds}`
}
