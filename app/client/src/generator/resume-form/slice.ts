import { reducer as reduxFormReducer } from 'redux-form'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormState, EmptyFields } from './types/form'
import { CustomSectionTypes } from './types/sections'
import {
  defaultFormValues,
  emptyBulletsSubsection,
  emptyTableSubsection,
  emptyParagraphSubsection
} from './values'

type ResumeFormState = FormState['resume']

const initialState: ResumeFormState = {
  values: { ...defaultFormValues },
  customSectionIndex: 1,
  registeredFields: []
}

function addSubsection(
  state: ResumeFormState,
  action: PayloadAction<{ sectionName: string; emptyFields: EmptyFields }>
) {
  const { sectionName, emptyFields } = action.payload
  state.values[sectionName].push(emptyFields)
}

function removeSubsection(
  state: ResumeFormState,
  action: PayloadAction<{ sectionName: string; indexToRemove: number }>
) {
  const { sectionName, indexToRemove } = action.payload
  state.values[sectionName].splice(indexToRemove, 1)
}

function addSubsectionKeyword(
  state: ResumeFormState,
  action: PayloadAction<{
    sectionName: string
    sectionIndex: number
    keywordsName: string
  }>
) {
  const { sectionName, sectionIndex, keywordsName } = action.payload
  state.values[sectionName][sectionIndex][keywordsName].push('')
}

function removeSubsectionKeyword(
  state: ResumeFormState,
  action: PayloadAction<{
    sectionName: string
    sectionIndex: number
    keywordsName: string
    keywordIndexToRemove: number
  }>
) {
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

function swapSectionsOrder(
  state: ResumeFormState,
  action: PayloadAction<{
    startIndex: number
    endIndex: number
  }>
) {
  const { startIndex, endIndex } = action.payload
  const [removed] = state.values.sections.splice(startIndex, 1)
  state.values.sections.splice(endIndex, 0, removed)
}

function swapSubsectionsOrder(
  state: ResumeFormState,
  action: PayloadAction<{
    sectionName: string
    startIndex: number
    endIndex: number
  }>
) {
  const { sectionName, startIndex, endIndex } = action.payload
  const [removed] = state.values[sectionName].splice(startIndex, 1)
  state.values[sectionName].splice(endIndex, 0, removed)
}

function addCustomSection(state: ResumeFormState, action: PayloadAction) {
  const sectionName = `custom-${state.customSectionIndex}`
  state.values[sectionName] = [emptyTableSubsection]
  state.values.sections.push({
    type: 'table',
    name: sectionName,
    displayName: `Unnamed ${state.customSectionIndex}`
  })
  state.customSectionIndex += 1
}

function setCustomSectionType(
  state: ResumeFormState,
  action: PayloadAction<{
    sectionName: string
    sectionType: CustomSectionTypes
  }>
) {
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
    swapSectionsOrder,
    swapSubsectionsOrder,
    addCustomSection,
    setCustomSectionType
  }
})

export const formActions = formSlice.actions

export const formReducer = reduxFormReducer.plugin({
  resume: formSlice.reducer
})
