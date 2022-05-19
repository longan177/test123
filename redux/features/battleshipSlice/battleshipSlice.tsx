import { createSlice } from "@reduxjs/toolkit";

export type BattleshipsType = {
  value: {
    id: number;
    name: string;
    size: number;
    placed: boolean;
  }[];
};

const initialBattleshipState: BattleshipsType = {
  value: [
    { id: 1, name: "destroyer", size: 2, placed: false },
    { id: 2, name: "submarine", size: 3, placed: false },
    { id: 3, name: "cruiser", size: 3, placed: false },
    { id: 4, name: "battleship", size: 4, placed: false },
    { id: 5, name: "carrier", size: 5, placed: false },
  ],
};

export const battleshipSlice = createSlice({
  name: "battleship",
  initialState: initialBattleshipState,
  reducers: {
    toggleIsPlaced: (state, action) => {
      const targetShipIndex = state.value.findIndex(
        ship => ship.name === action.payload
      );

      state.value[targetShipIndex].placed = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsPlaced } = battleshipSlice.actions;

export default battleshipSlice.reducer;
