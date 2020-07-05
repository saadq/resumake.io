import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { darkTheme, lightTheme } from 'common/theme'
import { SettingsState } from './types'

const initialState: SettingsState = {
  theme: darkTheme
}

function toggleTheme(state: SettingsState, action: PayloadAction) {
  state.theme = state.theme.name === 'dark' ? lightTheme : darkTheme
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme
  }
})

export const settingsActions = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
