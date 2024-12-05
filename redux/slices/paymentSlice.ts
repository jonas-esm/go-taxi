import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as dateFns from 'date-fns'

import { ReservationFormData } from '@/components/home/reserve-form'

export type PaymentState = {
  intentId?: string
  amount?: string | number
  payment_method?: string | null
  currency?: string
}

const initialState: PaymentState = {
  amount: '',
  currency: '',
  intentId: '',
  payment_method: ''
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<PaymentState>) => {
      state = { ...Object.assign({}, state, action.payload) }

      return state
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateState } = paymentSlice.actions

export default paymentSlice.reducer
