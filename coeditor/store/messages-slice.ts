import { createSlice } from "@reduxjs/toolkit";
import ChatMessage from "../models/chatMessage";

interface messagesState {
  messages: ChatMessage[];
}

const initialState: messagesState = {
  messages: [],
};

const messagesState = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setMessages: (state, action) => {
      const messages = action.payload.map((message: string) => {
        const msg = JSON.parse(message);
        return new ChatMessage(msg.username, msg.message)
      })
      state.messages = messages
    },
    addMessage: (state, action) => {
      const tempMessages = state.messages;
      tempMessages.push(new ChatMessage(action.payload.username, action.payload.message))
      state.messages = tempMessages;
    }
  },
});

export const messagesActions = messagesState.actions;

export default messagesState.reducer;
