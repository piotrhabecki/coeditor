import { createSlice } from "@reduxjs/toolkit";

interface codeEditorSlice {
  code: string;
  language: {
    value: string;
    label: string;
  };
}

const initialState: codeEditorSlice = {
  code: "// happy typing",
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
      state.language.value = action.payload.value;
      state.language.label = action.payload.label;
    }
  },
});

export const codeEditorActions = codeEditorState.actions;

export default codeEditorState.reducer;