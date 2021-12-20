import { render, RenderOptions } from '@testing-library/react-native'
import React, { PropsWithChildren } from 'react'
import AppProviders from './context/AppProviders'

const TestProviders = (props: PropsWithChildren<{}>) => (
  <AppProviders>{props.children}</AppProviders>
)

export const renderWithProviders = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: TestProviders, ...options })

export * from '@testing-library/react-native'
