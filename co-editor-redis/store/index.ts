import { configureStore } from "@reduxjs/toolkit";
import editorReducer from './code-editor-slice'
import sessionReducer from "./session-slice";
import messagesReducer from './messages-slice';
import outputReducer from './output-slice';
import socketReducer from './socket-slice'

const store = configureStore({
  reducer: {
    editor: editorReducer,
    session: sessionReducer,
    messages: messagesReducer,
    output: outputReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
