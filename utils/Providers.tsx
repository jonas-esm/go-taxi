'use client'
import React from 'react'

import { useParams } from 'next/navigation'

import { Provider } from 'react-redux'

import ThemeProvider from '@/components/theme'
import ClientProviders from './ClientProviders'
import { store } from '@/redux/store/store'

const Providers = (props: { children: React.ReactNode }) => {
  const { children } = props
  const params = useParams()

  return (
    <Provider store={store}>
      <ThemeProvider direction={params.lang === 'ar' ? 'rtl' : 'ltr'} systemMode='light'>
        <ClientProviders>{children}</ClientProviders>
      </ThemeProvider>
    </Provider>
  )
}

export default Providers
