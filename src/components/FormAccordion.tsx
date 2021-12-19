import React from 'react'
import styled from '@emotion/native'

type Props = {
  label: string
  selectedLabel: string
  children: React.ReactNode
}

export default ({ label, children, selectedLabel }: Props) => {
  return (
    <Wrapper>
      <Header>
        <Label>{label}</Label>
        <HeaderRight>
          <SelectedValue>{selectedLabel}</SelectedValue>
        </HeaderRight>
      </Header>
      {children}
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
  font-size: 16px;
`
const SelectedValue = styled.Text`
  font-family: ${p => p.theme.font[500]};
  color: ${p => p.theme.grey[500]};
  font-size: 16px;
`
//#endregion
