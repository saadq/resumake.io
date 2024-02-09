import { combineReducers } from "@reduxjs/toolkit";
import DataSlice from './DataSlice'

const rootReduceur = combineReducers({
    isData: DataSlice.isData
})

export default rootReduceur