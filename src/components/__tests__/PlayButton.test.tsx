import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { render, fireEvent } from '../../testUtils'
import theme from '../../theme'
import PlayButton from '../PlayButton'

it('renders component without errors and fires click event', async () => {
  const mockFn = jest.fn()
  const comp = render(
    <ThemeProvider theme={theme.dark}>
      <PlayButton onPress={mockFn} />
    </ThemeProvider>
  )

  //* renders component with success
  expect(comp).toBeTruthy()
  const button = comp.getByLabelText(/Start focus sections/i)
  expect(button).toBeTruthy()

  //* fires onPress event
  fireEvent.press(button)
  expect(mockFn).toBeCalledTimes(1)
})
