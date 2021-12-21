import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { render, fireEvent } from '../../testUtils'
import theme from '../../theme'
import Button from '../Button'

it('renders component without errors and fires click event', async () => {
  const mockFn = jest.fn()

  const button = render(
    <ThemeProvider theme={theme.dark}>
      <Button onPress={mockFn} title="Click me!" />
    </ThemeProvider>
  )

  //* renders component with success
  expect(button).toBeTruthy()
  expect(button.getByText(/click me should not find/i)).toBeTruthy()

  //* click event works
  fireEvent.press(button.getByText(/click me/i))
  fireEvent.press(button.getByText(/click me/i))
  expect(mockFn).toBeCalledTimes(2)
})
