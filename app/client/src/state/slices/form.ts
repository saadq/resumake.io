import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormState, FormValues } from '../../types/form'

const initialState: FormState = {}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    generateResume(state, action: PayloadAction<FormValues>) {}
  }
})

export const formActions = formSlice.actions
export const formReducer = formSlice.reducer
