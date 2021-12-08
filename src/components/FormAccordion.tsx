import React from 'react'
import styled from '@emotion/native'
import { StyleSheet } from 'react-native'
import { font, grey } from '../theme'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  label: string
  selectedLabel: string
  children: React.ReactNode
  initialExpanded?: boolean
}

export default ({ label, children, selectedLabel, initialExpanded = false }: Props) => {
  const [expanded, setExpanded] = React.useState(initialExpanded)

  const expandedDV = useDerivedValue(() => expanded, [expanded])
  const animatedExpandableStyles = useAnimatedStyle(
    () => ({ height: withTiming(expandedDV.value === true ? 200 : 0) }),
    [expanded]
  )

  return (
    <Wrapper>
      <TouchableWithoutFeedback onPress={() => setExpanded(s => !s)}>
        <Header>
          <Label>{label}</Label>
          <HeaderRight>
            <SelectedValue>{selectedLabel}</SelectedValue>
            <AntDesign name={expanded ? 'caretdown' : 'caretup'} size={14} color={grey[500]} />
          </HeaderRight>
        </Header>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.expandableWrapper, animatedExpandableStyles]}>
        {children}
      </Animated.View>
    </Wrapper>
  )
}

//#region Styles
const Wrapper = styled.View`
  background-color: ${p => p.theme.grey[800]};
  border-radius: 16px;
  padding: 20px;
`

const HeaderRight = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
`
const Label = styled.Text`
  font-family: ${p => p.theme.font.bold};
  color: ${p => p.theme.text};
  font-size: 18px;
`
const SelectedValue = styled.Text`
  font-family: ${p => p.theme.font[500]};
  color: ${p => p.theme.grey[500]};
  font-size: 18px;
  margin-right: 16px;
`
const styles = StyleSheet.create({
  expandableWrapper: { overflow: 'hidden' }
})
//#endregion
