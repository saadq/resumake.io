import { PreviewState } from './types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { FormValues } from 'generator/resume-form/types/form'

const initialState: PreviewState = {
  resume: {
    loading: false
  }
}

const generateResume = createAsyncThunk(
  'preview/generateResume',
  async (formValues: FormValues) => {
    const response = await fetch('/api/generate/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf'
      },
      body: JSON.stringify(formValues)
    })
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    return url
  }
)

const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateResume.pending, (state, action) => {
      state.resume.loading = true
      state.resume.error = null
    })

    builder.addCase(generateResume.fulfilled, (state, action) => {
      state.resume.loading = false
      state.resume.url = action.payload
    })

    builder.addCase(generateResume.rejected, (state, action) => {
      state.resume.loading = false
      state.resume.error = action.error.message
    })
  }
})

export const previewActions = {
  ...previewSlice.actions,
  generateResume
}

export const previewReducer = previewSlice.reducer
