import { createSlice } from "@reduxjs/toolkit";

interface outputState {
  
  output: {
    EvalOutput: string | null;
    ConsoleOutput: string[] | null;
  }
}

const initialState: outputState = {
    output: {
      EvalOutput: "Here the output of code run will be displayed",
      ConsoleOutput: [""]
    }
};

const outputState = createSlice({
  name: "output",
  initialState: initialState,
  reducers: {
    setOutput: (state, action) => {
      if(Object.keys(action.payload.evalOutput).length !== 0)
      {
        state.output.EvalOutput = action.payload.evalOutput;
      }
      else
      {
        state.output.EvalOutput = "";
      }
      if(action.payload.consoleOutput.length !== 0)
      {
        state.output.ConsoleOutput = action.payload.consoleOutput
      }
      else 
      {
        state.output.ConsoleOutput = [""];
      }
    },
    runJavascriptCode: (state, action) => {
      
    }
  },
});

export const outputActions = outputState.actions;

export default outputState.reducer;
