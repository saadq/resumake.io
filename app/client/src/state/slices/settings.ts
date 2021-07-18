import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SettingsState } from '../../types/settings'

const initialState: SettingsState = {
  theme: 'dark'
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction) {
      state.theme === 'dark' ? 'light' : 'dark'
    }
  }
})

export const settingsActions = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
