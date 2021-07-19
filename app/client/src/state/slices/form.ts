import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormState, FormValues } from '../../types/form'

const initialState: FormState = {
  isGenerating: false
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    generateResume(state, action: PayloadAction<FormValues>) {
      state.isGenerating = true
    },
    generateResumeSuccess(state, action: PayloadAction) {
      state.isGenerating = false
    },
    generateResumeFailure(state, action: PayloadAction) {
      state.isGenerating = false
    }
  }
})

export const formActions = formSlice.actions
export const formReducer = formSlice.reducer
