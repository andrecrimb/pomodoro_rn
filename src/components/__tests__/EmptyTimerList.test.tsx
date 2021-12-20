import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { reanimatedSetup } from '../../../jest-setup'
import { render } from '../../testUtils'
import theme from '../../theme'
import EmptyTimerList from '../EmptyTimerList'

beforeAll(() => {
  reanimatedSetup()
})

it('renders component without errors', async () => {
  const comp = render(
    <ThemeProvider theme={theme.dark}>
      <EmptyTimerList />
    </ThemeProvider>
  )

  //* renders component with success
  expect(comp).toBeTruthy()
  expect(comp.getByText(/Create your first time tracker/i)).toBeTruthy()
  expect(comp.getByA11yLabel(/Pointing arrow/i)).toBeTruthy()
})
