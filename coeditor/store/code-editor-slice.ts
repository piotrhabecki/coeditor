import { createSlice } from "@reduxjs/toolkit";
import Language from "../models/language";

interface codeEditorSlice {
  code: string | undefined;
  language: Language
}

const initialState: codeEditorSlice = {
  code: undefined,
  language: { value: "javascript", label: "javascript" },
};

const codeEditorState = createSlice({
  name: "console",
  initialState: initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLanguage: (state, action) => {
      console.log(action)
      state.language.value = action.payload.value;
      state.language.label = action.payload.label;
    }
  },
});

export const codeEditorActions = codeEditorState.actions;

export default codeEditorState.reducer;