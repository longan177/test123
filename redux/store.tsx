import { configureStore } from "@reduxjs/toolkit";
import battleshipReducer from "./features/battleshipSlice/battleshipSlice";
import boardReducer from "./features/boardSlice/boardSlice";

export const store = configureStore({
  reducer: {
    battleships: battleshipReducer,
    board: boardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
