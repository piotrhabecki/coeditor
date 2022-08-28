import { createSlice } from "@reduxjs/toolkit";

interface sessionState {
  username: string;
  roomId: string;
  isSessionSet: boolean;
  otherUserConnected: boolean;
}

const initialState: sessionState = {
  username: "",
  roomId: '',
  isSessionSet: false,
  otherUserConnected: false,
};

const sessionState = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    isSessionSetInDb: (state, action) => {
      state.isSessionSet = action.payload;
    },
    setOtherUserConnected: (state, action) => {
        state.otherUserConnected = action.payload;
    }
  },
});

export const sessionActions = sessionState.actions;

export default sessionState.reducer;
