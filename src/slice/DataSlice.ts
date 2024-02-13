import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      return [...state, action.payload];
    }
  }
});

export const { setData } = dataSlice.actions;

const rootReducer = {
  isData: dataSlice.reducer
};

export default rootReducer;
