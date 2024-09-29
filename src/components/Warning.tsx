import React from 'react'
import i18n from '../i18n'
import styled from '@emotion/native'

export const Warning = () => {
  return (
    <Wrapper>
      <InnerText>{i18n.t('notification_disabled_warning')}</InnerText>
    </Wrapper>
  )
}

const InnerText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: ${p => p.theme.font[500]};
  line-height: 24px;
`
const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 8px;
  background-color: ${p => p.theme.danger};
`
