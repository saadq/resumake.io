import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SettingsState } from './types'

const initialState: SettingsState = {
  theme: 'dark'
}

function toggle(state: SettingsState, action: PayloadAction) {
  state.theme === 'dark' ? 'light' : 'dark'
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggle
  }
})

export const settingsActions = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
