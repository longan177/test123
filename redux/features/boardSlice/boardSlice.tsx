import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import computerBoardRandom from "./computerBoardData";

export type ShipStatusType = {
  destroyer: number;
  submarine: number;
  cruiser: number;
  battleship: number;
  carrier: number;
};

const initialShipStatus: ShipStatusType = {
  destroyer: 2,
  submarine: 3,
  cruiser: 3,
  battleship: 4,
  carrier: 5,
};

// Define a type for the slice state
export type BoardType = {
  value: {
    myBoard: { coordinate: number; ship: string }[];
    opponentBoard: {
      placement: { coordinate: number; ship: string }[];
      status: ShipStatusType;
    };
  };
};

// Define the initial state using that type
const initialState: BoardType = {
  value: {
    myBoard: [],
    opponentBoard: {
      placement: computerBoardRandom,
      status: { ...initialShipStatus },
    },
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

    attackShip: (state, action: PayloadAction<string>) => {
      let targetShipStatus = state.value.opponentBoard.status[action.payload];
      if (targetShipStatus) {
        //prevent the status goes down to 0
        state.value.opponentBoard.status[action.payload]--;
      }
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const { insertShip, attackShip } = boardSlice.actions;
export default boardSlice.reducer;
