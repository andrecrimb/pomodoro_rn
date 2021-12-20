import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { render, fireEvent } from '../../testUtils'
import theme from '../../theme'
import CloseButton from '../CloseButton'

it('renders component without errors and fires click event', async () => {
  const mockFn = jest.fn()

  const button = render(
    <ThemeProvider theme={theme.dark}>
      <CloseButton onPress={mockFn} />
    </ThemeProvider>
  )

  //* renders component with success
  expect(button).toBeTruthy()
  expect(button.getByLabelText(/close/i)).toBeTruthy()

  //* click event works
  fireEvent.press(button.getByLabelText(/close/i))
  fireEvent.press(button.getByLabelText(/close/i))
  expect(mockFn).toBeCalledTimes(2)
})
