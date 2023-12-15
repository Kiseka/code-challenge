"use client"

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import generalReducer from './features/generalSlice'

export const store = configureStore({
  reducer: {
    general: generalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
