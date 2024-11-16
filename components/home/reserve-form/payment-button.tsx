import React, { useEffect, useState } from 'react'

import type { PaymentRequest } from '@stripe/stripe-js'

import Button from '@/components/shared/button'
import stripePromise from '@/lib/stripe'

function PaymentButton() {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null)

  useEffect(() => {
    const setupPaymentRequest = async () => {
      const stripe = await stripePromise

      const pr = stripe?.paymentRequest({
        country: 'NL', // Replace with your country
        currency: 'eur',
        total: {
          label: 'GoTaxi Trip',
          amount: 1000 // Amount in cents (e.g., $10.00)
        }

        // requestPayerName: true,
        // requestPayerEmail: true,
      })

      const canMakePayment = await pr?.canMakePayment()

      if (canMakePayment) {
        setPaymentRequest(pr!)
      }

      if (canMakePayment) {
        console.log('Google Pay is available.')
      } else {
        console.error('Google Pay is not available.')
      }
    }

    setupPaymentRequest()
  }, [])

  if (!paymentRequest) return null

  return (
    <Button
      sx={{ mt: 4 }}
      fullWidth
      //@ts-ignore
      onClick={() => paymentRequest.show()}
      size='large'
    >
      Proceed to payment
    </Button>

    // <button
    //   onClick={() => paymentRequest.show()}
    //   style={{
    //     display: 'inline-block',
    //     backgroundColor: '#000',
    //     color: '#fff',
    //     padding: '10px 20px',
    //     fontSize: '16px',
    //     borderRadius: '5px',
    //     cursor: 'pointer'
    //   }}
    // >
    //   Pay with Apple Pay
    // </button>
  )
}

export default PaymentButton
