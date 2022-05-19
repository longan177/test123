import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/battleshipSlice";
import boardReducer from "./features/boardSlice/boardSlice";

export const store = configureStore({
  reducer: {
    battleships: counterReducer,
    board: boardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
