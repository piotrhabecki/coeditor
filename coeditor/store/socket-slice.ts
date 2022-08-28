import { createSlice } from "@reduxjs/toolkit";
import pusherJs from "pusher-js";

interface socketState {
  messagePusher: pusherJs | null;
}

const initialState: socketState = {
  messagePusher: null
};

const socketState = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    setMessagePusher: (state, action) => {
      state.messagePusher = action.payload;
    }
  },
});

export const socketActions = socketState.actions;

export default socketState.reducer;
