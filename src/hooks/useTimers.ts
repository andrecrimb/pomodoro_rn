import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { Timer } from '../types/timer'
import React from 'react'
import { TimersActionsContext, TimersContext } from '../context/TimersContext'
import { uniqueID } from '../utils'

type Props = {
  onSuccess?: () => void
  onError?: () => void
}

export default () => {
  const { getItem: getItemStorage, setItem: setItemStorage } = useAsyncStorage('@timers')
  const data = React.useContext(TimersContext)
  const setData = React.useContext(TimersActionsContext)

  const [error, setError] = React.useState<unknown>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isFetching, setIsFetching] = React.useState(false)

  const readFromStorage = React.useCallback(
    async (props?: Props) => {
      try {
        setIsFetching(true)

        const list = await getItemStorage()

        if (list !== null) {
          const parsedList = JSON.parse(list)
          setData(parsedList)
        }

        props?.onSuccess?.()
        setError(null)
      } catch (e) {
        props?.onError?.()
        setError(e)
      } finally {
        setIsLoading(false)
        setIsFetching(false)
      }
    },
    [setData]
  )

  const writeNewItemToStorage = React.useCallback(
    async (timer: Omit<Timer, 'id'>, props?: Props) => {
      try {
        const newItem: Timer = { ...timer, id: uniqueID() + '' }
        const newList = [newItem, ...data]

        await setItemStorage(JSON.stringify(newList))
        await readFromStorage()

        props?.onSuccess?.()
      } catch (e) {
        props?.onError?.()
        setError(e)
      }
    },
    [data]
  )

  const editItemFromStorage = React.useCallback(
    async (timer: Timer, props?: Props) => {
      try {
        const newList = data.map(t => (t.id === timer.id ? timer : t))

        await setItemStorage(JSON.stringify(newList))
        await readFromStorage()

        props?.onSuccess?.()
      } catch (e) {
        props?.onError?.()
        setError(e)
      }
    },
    [data]
  )

  const removeItemFromStorage = React.useCallback(
    async (timerId: string, props?: Props) => {
      try {
        const listWithoutItem = data.filter(t => t.id !== timerId)

        await setItemStorage(JSON.stringify(listWithoutItem))
        await readFromStorage()

        props?.onSuccess?.()
      } catch (e) {
        props?.onError?.()
        setError(e)
      }
    },
    [data]
  )

  React.useEffect(() => {
    if (data.length === 0 && isFetching) {
      setIsLoading(true)
    }
  }, [data, isFetching])

  React.useEffect(() => {
    readFromStorage()
  }, [])

  return {
    error,
    isLoading,
    isFetching,
    refetch: readFromStorage,
    data,
    addTimer: writeNewItemToStorage,
    removeTimer: removeItemFromStorage,
    editTimer: editItemFromStorage
  }
}
