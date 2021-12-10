import React from 'react'
import { FlatList } from 'react-native'
import useTimers from '../hooks/useTimers'
import { Timer } from '../types/timer'
import EmptyTimerList from './EmptyTimerList'
import TimerListItem from './TimerListItem'

const renderItem = ({ item }: { item: Timer }) => {
  return <TimerListItem item={item} />
}

const TimersList = () => {
  const { data, isFetching, refetch } = useTimers()

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      refreshing={isFetching}
      onRefresh={refetch}
      ListEmptyComponent={EmptyTimerList}
    />
  )
}

export default TimersList
