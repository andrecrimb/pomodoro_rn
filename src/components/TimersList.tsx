import React from 'react'
import styled from '@emotion/native'
import { FlatList, StyleSheet } from 'react-native'
import i18n from '../i18n'
import { Timer } from '../types/timer'
import PlayButton from './PlayButton'
import { Octicons } from '@expo/vector-icons'
import { primary } from '../theme'

const DATA = [
  {
    id: 'kljdsfk',
    name: 'Special course',
    focus: 30,
    short_break: 5,
    long_break: 20,
    sections: 1
  },
  {
    id: '9870870870',
    name: 'Task 3',
    focus: 30,
    short_break: 5,
    long_break: 20,
    sections: 1
  },
  {
    id: '070890987',
    name: 'Tas8787k 3',
    focus: 30,
    short_break: 5,
    long_break: 20,
    sections: 1
  },
  {
    id: 'klj987987098709876djjsfk',
    name: 'Task 3',
    focus: 30,
    short_break: 5,
    long_break: 20,
    sections: 1
  },
  {
    id: '0987098708',
    name: 'Task 3',
    focus: 30,
    short_break: 5,
    long_break: 20,
    sections: 1
  },
  {
    id: 'kljdj8909709876987jsfk',
    name: 'Task 3',
    focus: 30,
    short_break: 5,
    long_break: 20,
    sections: 1
  },
  {
    id: 'kljdjj098708798769876sfk',
    name: 'Task 3',
    focus: 30,
    short_break: 5,
    long_break: 20,
    sections: 1
  },
  {
    id: 'klj899d0870sfk',
    name: 'Learning time',
    focus: 30,
    short_break: 5,
    long_break: 20,
    sections: 1
  }
]

const renderItem = ({ item }: { item: Timer }) => (
  <Cell>
    <InfoWrapper>
      <CellName>{item.name}</CellName>
      <InfoBottom>
        <CellAdditionalInfo>
          {i18n.t('focus')} {i18n.t('x_min', { count: item.focus })}
        </CellAdditionalInfo>
        <Octicons name="primitive-dot" style={styles.dot} size={14} color={primary.main} />
        <CellAdditionalInfo>
          {item.sections} {i18n.t('interval', { count: item.sections })}
        </CellAdditionalInfo>
      </InfoBottom>
    </InfoWrapper>
    <PlayButton onPress={() => {}} />
  </Cell>
)

const TimersList = () => {
  return <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
}

//#region Styles
const Cell = styled.View`
  background-color: ${p => p.theme.grey[800]};
  padding: 20px;
  margin: 8px 10px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const InfoWrapper = styled.View``
const InfoBottom = styled.View`
  flex-direction: row;
  margin-top: 16px;
  align-items: center;
`
const CellName = styled.Text`
  color: ${p => p.theme.text};
  font-family: ${p => p.theme.font.bold};
  font-size: 16px;
`
const CellAdditionalInfo = styled.Text`
  color: ${p => p.theme.grey[500]};
  font-family: ${p => p.theme.font[500]};
`
const styles = StyleSheet.create({
  dot: { marginLeft: 10, marginRight: 10 }
})
//#endregion

export default TimersList
