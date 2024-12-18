import { configureStore } from '@reduxjs/toolkit'

import tripReducer from '@/redux/slices/tripSlice'
import paymentReducer from '@/redux/slices/paymentSlice'

export const store = configureStore({
  reducer: { trip: tripReducer, payment: paymentReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
