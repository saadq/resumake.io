import { reducer as reduxFormReducer } from 'redux-form'
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { FormState, EmptyFields } from './types/form'
import { CustomSectionTypes } from './types/sections'
import {
  defaultFormValues,
  emptyBulletsSubsection,
  emptyTableSubsection,
  emptyParagraphSubsection
} from './values'

type ResumeFormState = FormState['resume']

type ActionReducer<ActionPayload = void> = CaseReducer<
  ResumeFormState,
  PayloadAction<ActionPayload>
>

const initialState: ResumeFormState = {
  values: { ...defaultFormValues },
  customSectionIndex: 1,
  registeredFields: []
}

const addSubsection: ActionReducer<{
  sectionName: string
  emptyFields: EmptyFields
}> = (state, action) => {
  const { sectionName, emptyFields } = action.payload
  state.values[sectionName].push(emptyFields)
}

const removeSubsection: ActionReducer<{
  sectionName: string
  indexToRemove: number
}> = (state, action) => {
  const { sectionName, indexToRemove } = action.payload
  state.values[sectionName].splice(indexToRemove, 1)
}

const addSubsectionKeyword: ActionReducer<{
  sectionName: string
  sectionIndex: number
  keywordsName: string
}> = (state, action) => {
  const { sectionName, sectionIndex, keywordsName } = action.payload
  state.values[sectionName][sectionIndex][keywordsName].push('')
}

const removeSubsectionKeyword: ActionReducer<{
  sectionName: string
  sectionIndex: number
  keywordsName: string
  keywordIndexToRemove: number
}> = (state, action) => {
  const {
    sectionName,
    sectionIndex,
    keywordsName,
    keywordIndexToRemove
  } = action.payload
  state.values[sectionName][sectionIndex][keywordsName].splice(
    keywordIndexToRemove,
    1
  )
}

const swapSubsectionsOrder: ActionReducer<{
  sectionName: string
  startIndex: number
  endIndex: number
}> = (state, action) => {
  const { sectionName, startIndex, endIndex } = action.payload
  const [removed] = state.values[sectionName].splice(startIndex, 1)
  state.values[sectionName].splice(endIndex, 0, removed)
}

const addCustomSection: ActionReducer = (state, action) => {
  const sectionName = `custom-${state.customSectionIndex}`
  state.values[sectionName] = [emptyTableSubsection]
  state.values.sections.push({
    type: 'table',
    name: sectionName,
    displayName: `Unnamed ${state.customSectionIndex}`
  })
  state.customSectionIndex += 1
}

const setCustomSectionType: ActionReducer<{
  sectionName: string
  sectionType: CustomSectionTypes
}> = (state, action) => {
  const { sectionName, sectionType } = action.payload
  const oldSection = state.values.sections.find(
    (section) => section.name === sectionName
  )
  if (!oldSection) return

  oldSection.type = sectionType
  if (sectionType === 'bullets') {
    state.values[sectionName] = [emptyBulletsSubsection]
  } else if (sectionType === 'table') {
    state.values[sectionName] = [emptyTableSubsection]
  } else if (sectionType === 'paragraph') {
    state.values[sectionName] = [emptyParagraphSubsection]
  }
}

const formSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    addSubsection,
    removeSubsection,
    addSubsectionKeyword,
    removeSubsectionKeyword,
    swapSubsectionsOrder,
    addCustomSection,
    setCustomSectionType
  }
})

export const formActions = formSlice.actions

export const formReducer = reduxFormReducer.plugin({
  resume: formSlice.reducer
})
