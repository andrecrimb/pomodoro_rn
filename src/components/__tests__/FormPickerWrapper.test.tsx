import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { Text } from 'react-native'
import { render } from '../../testUtils'
import theme from '../../theme'
import FormPickerWrapper from '../FormPickerWrapper'

it('renders component without errors', async () => {
  const comp = render(
    <ThemeProvider theme={theme.dark}>
      <FormPickerWrapper selectedLabel="selected label" label="field label">
        <Text>Children component</Text>
      </FormPickerWrapper>
    </ThemeProvider>
  )

  //* renders component with success
  expect(comp).toBeTruthy()
  expect(comp.getByText(/children component/i)).toBeTruthy()
  expect(comp.getByText(/field label/i)).toBeTruthy()
  expect(comp.getByText(/selected label/i)).toBeTruthy()
})
