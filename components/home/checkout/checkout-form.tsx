import React, { useMemo, useState } from 'react'

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import type { StripePaymentElementOptions } from '@stripe/stripe-js'

import { Alert, Box, CircularProgress, Divider, Stack, Typography } from '@mui/material'

import { useDispatch } from 'react-redux'

import { useFormContext } from 'react-hook-form'

import Button from '@/components/shared/button'
import FormContainer from '../reserve-form/form-container'
import { updateState } from '@/redux/slices/paymentSlice'

import type { ReservationFormData } from '../reserve-form'

export default function CheckoutForm({
  dpmCheckerLink,
  handlePayInCash
}: {
  dpmCheckerLink?: string
  handlePayInCash: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const { getValues } = useFormContext<ReservationFormData>()

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isElementReady, setIsElementReady] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window?.location?.href + '?step=2'
      }
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || '')
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  const amountToPay = useMemo(() => getValues('amount'), [getValues])

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'accordion'
  }

  return (
    <FormContainer>
      <Typography mb={4}>Payment Amount: {amountToPay?.toLocaleString()}</Typography>
      <form id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' options={paymentElementOptions} onReady={() => setIsElementReady(true)} />

        {isElementReady ? (
          <>
            <Button
              sx={{ my: 8 }}
              fullWidth
              size='large'
              loading={isLoading}
              type='submit'
              disabled={!stripe || !elements}
            >
              Submit
            </Button>
            <Box mx={'25%'} mb={2} textAlign={'center'}>
              <Divider>Or</Divider>
            </Box>
            <Box textAlign={'center'}>
              <Button disabled={isLoading} variant='text' onClick={() => handlePayInCash()}>
                Pay in cash
              </Button>
            </Box>
          </>
        ) : (
          <Stack alignItems={'center'} my={6} justifyContent={'center'}>
            <CircularProgress />
          </Stack>
        )}

        {/* <button disabled={isLoading || !stripe || !elements} id='submit'>
          <span id='button-text'>{isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}</span>
        </button> */}
        {/* Show any error or success messages */}
        {message && <Alert>{message}</Alert>}
      </form>
      {/* [DEV]: For demo purposes only, display dynamic payment methods annotation and integration checker */}
      {/* <div id='dpm-annotation'>
        <p>
          Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
          <a href={dpmCheckerLink} target='_blank' rel='noopener noreferrer' id='dpm-integration-checker'>
            Preview payment methods by transaction
          </a>
        </p>
      </div> */}
    </FormContainer>
  )
}
