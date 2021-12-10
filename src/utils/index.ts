export const uniqueID = () => Math.floor(Math.random() * Date.now())

export const createArr = (length: number, startIndex: number = 1, space: number = 1) => {
  const arr: number[] = []

  for (let i = startIndex; i <= length; i += space) {
    arr.push(i)
  }
  return arr
}
