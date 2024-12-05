import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as dateFns from 'date-fns'

import type { ReservationFormData } from '@/components/home/reserve-form'

const initialState: ReservationFormData = {
  from: null,
  to: null,
  date: new Date(),
  time: dateFns.add(new Date(), {
    hours: 0.5,
    minutes: 60 - new Date().getMinutes()
  }),
  dateTime: new Date(),
  fullName: '',
  phoneNumber: '',
  notes: '',
  carType: '',
  fromSearch: '',
  toSearch: ''
}

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<ReservationFormData>) => {
      state = { ...Object.assign({}, state, action.payload) }

      return state
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateState } = tripSlice.actions

export default tripSlice.reducer
