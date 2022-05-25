import { createSlice } from "@reduxjs/toolkit";
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
    myBoard: {
      placement: { coordinate: number; ship: string }[];
      status: ShipStatusType;
    };

    opponentBoard: {
      placement: { coordinate: number; ship: string }[];
      status: ShipStatusType;
    };
  };
};

// Define the initial state using that type
const initialState: BoardType = {
  value: {
    myBoard: {
      placement: [],
      status: { ...initialShipStatus },
    },
    opponentBoard: {
      placement: [],
      status: { ...initialShipStatus },
    },
  },
};

export const boardSlice = createSlice({
  name: "battleship",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    insertShip: (state, action) => {
      state.value.myBoard.placement.push(action.payload);
    },
    assignOpponentShips: state => {
      state.value.opponentBoard.placement = computerBoardRandom;
      console.log(state.value.opponentBoard.placement);
    },
  },
});

export const { insertShip, assignOpponentShips } = boardSlice.actions;
export default boardSlice.reducer;
