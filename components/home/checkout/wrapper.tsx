import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import type { Appearance, StripeElementsOptionsClientSecret } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { useDispatch, useSelector } from 'react-redux'

import { CircularProgress, Stack } from '@mui/material'

import Complete from './complete'
import CheckoutForm from './checkout-form'
import type { RootState } from '@/redux/store/store'
import { updateState } from '@/redux/slices/paymentSlice'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function CheckoutWrapper({ setActiveStep }: { setActiveStep: (step: 0 | 1 | 2 | 3) => void }) {
  const tripState = useSelector((state: RootState) => state.trip)
  const searchParams = useSearchParams()
  const dispatch = useDispatch()

  const [clientSecret, setClientSecret] = useState(searchParams.get('payment_intent_client_secret') || '')
  const [dpmCheckerLink, setDpmCheckerLink] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    // setConfirmed(!!new URLSearchParams(window.location.search).get('payment_intent_client_secret'))
    if (searchParams.get('payment_intent_client_secret')) {
      setConfirmed(!!searchParams.get('payment_intent_client_secret'))
      setClientSecret(searchParams.get('payment_intent_client_secret') || '')
    }
  })

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetch('/api/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt', amount: (tripState?.amount || 0) * 100 }] })
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret)

        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink)
      })
  }, [])

  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#ff8838'
    }
  }

  const options: StripeElementsOptionsClientSecret = {
    clientSecret,
    appearance
  }

  const handlePayInCash = () => {
    dispatch(
      updateState({
        amount: tripState?.amount,

        currency: 'usd',

        payment_method: 'CASH'
      })
    )
    setActiveStep(3)
  }

  return (
    <div className='App'>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? (
            <Complete setActiveStep={setActiveStep} />
          ) : (
            <CheckoutForm dpmCheckerLink={dpmCheckerLink} handlePayInCash={handlePayInCash} />
          )}
        </Elements>
      ) : (
        <Stack alignItems={'center'} my={6} justifyContent={'center'}>
          <CircularProgress />
        </Stack>
      )}
    </div>
  )
}
