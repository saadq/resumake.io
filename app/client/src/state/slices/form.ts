import { createSlice } from '@reduxjs/toolkit'
import { FormState } from '../../types/form'

const initialState: FormState = {}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    generateResume() {}
  }
})

export const formActions = formSlice.actions
export const formReducer = formSlice.reducer
