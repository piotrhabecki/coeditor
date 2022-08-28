import { createSlice } from "@reduxjs/toolkit";

interface outputState {
  output: string;
}

const initialState: outputState = {
    output: "Here the output of code run will be displayed",
};

const outputState = createSlice({
  name: "output",
  initialState: initialState,
  reducers: {
    setOutput: (state, action) => {
      state.output = action.payload;
    },
  },
});

export const outputActions = outputState.actions;

export default outputState.reducer;
