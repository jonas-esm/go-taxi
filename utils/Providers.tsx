'use client'
import React from 'react'

import { Provider } from 'react-redux'

import ThemeProvider from '@/components/theme'
import ClientProviders from './ClientProviders'
import { store } from '@/redux/store/store'

const Providers = (props: { children: React.ReactNode }) => {
  const { children } = props

  return (
    <Provider store={store}>
      <ThemeProvider direction='ltr' systemMode='light'>
        <ClientProviders>{children}</ClientProviders>
      </ThemeProvider>
    </Provider>
  )
}

export default Providers
