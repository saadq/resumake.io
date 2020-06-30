import { PreviewState } from './types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import FileSaver from 'file-saver'
import { FormValues } from 'generator/resume-form/types/form'

const initialState: PreviewState = {
  resume: {
    loading: false
  }
}

const downloadSource = createAsyncThunk(
  'preview/downloadSource',
  async (formValues: FormValues) => {
    const response = await fetch('/api/generate/source', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/zip'
      },
      body: JSON.stringify(formValues)
    })
    const blob = await response.blob()
    FileSaver.saveAs(blob, 'resume.zip')
  }
)

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

    const jsonString = JSON.stringify(formValues, null, 2)
    const jsonBlob = new Blob([jsonString], { type: 'application/json' })
    const jsonUrl = URL.createObjectURL(jsonBlob)

    const pdfBlob = await response.blob()
    const pdfUrl = URL.createObjectURL(pdfBlob)

    return { pdfUrl, jsonUrl }
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
      state.resume.url = action.payload.pdfUrl
      state.resume.jsonUrl = action.payload.jsonUrl
    })

    builder.addCase(generateResume.rejected, (state, action) => {
      state.resume.loading = false
      state.resume.error = action.error.message
    })
  }
})

export const previewActions = {
  ...previewSlice.actions,
  generateResume,
  downloadSource
}

export const previewReducer = previewSlice.reducer
