import { createSlice } from "@reduxjs/toolkit";
import pusherJs from "pusher-js";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface socketState {
  messageSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  codeSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  messagePusher: pusherJs | null;
}

const initialState: socketState = {
  messageSocket: null,
  codeSocket: null,
  messagePusher: null
};

const socketState = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    setMessageSocket: (state, action) => {
      state.messageSocket = action.payload;
    },
    setCodeSocket: (state, action) => {
      state.codeSocket = action.payload;
    },
    setMessagePusher: (state, action) => {
      state.messagePusher = action.payload;
    }
  },
});

export const socketActions = socketState.actions;

export default socketState.reducer;
