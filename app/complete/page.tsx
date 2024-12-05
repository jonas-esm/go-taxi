'use client'
import React from 'react'

import CheckoutWrapper from '@/components/home/checkout/wrapper'

export default function Page() {
  return (
    <CheckoutWrapper
      setActiveStep={() => {
        console.log('SetActiveStep is not defined')
      }}
    />
  )
}
