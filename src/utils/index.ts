export const uniqueID = () => '_' + Math.random().toString(36).substr(2, 9)

export const createArr = (length: number, startIndex: number = 1, space: number = 1) => {
  const arr: number[] = []

  for (let i = startIndex; i <= length; i += space) {
    arr.push(i)
  }
  return arr
}
