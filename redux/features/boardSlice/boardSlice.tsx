import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import computerBoardRandom from "./computerBoardData";

// Define a type for the slice state
export type BoardType = {
  value: {
    myBoard: { coordinate: number; ship: string }[];
    opponentBoard: { coordinate: number; ship: string }[];
  };
};

// Define the initial state using that type
const initialState: BoardType = {
  value: {
    myBoard: [],
    opponentBoard: computerBoardRandom,
  },
};

export const boardSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    insertShip: (state, action) => {
      state.value.myBoard.push(action.payload);
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const { insertShip } = boardSlice.actions;
export default boardSlice.reducer;
