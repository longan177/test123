import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import computerBoardRandom from "./computerBoardData";
export type ShipStatusType = {
  destroyer: number;
  submarine: number;
  battleship: number;
  cruiser: number;
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
    gameID: number;
    isGameFinished: boolean;
    myBoard: {
      placement: { coordinate: number; ship: string }[];
      status: ShipStatusType;
    };

    opponentBoard: {
      placement: { coordinate: number; ship: string }[];
      status: ShipStatusType;
    };
    name: string;
    result: string;
  };
};

// Define the initial state using that type
const initialState: BoardType = {
  value: {
    gameID: 0,
    isGameFinished: false,
    myBoard: {
      placement: [],
      status: { ...initialShipStatus },
    },
    opponentBoard: {
      placement: [],
      status: { ...initialShipStatus },
    },
    name: "",
    result: "",
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

    attackShip: (state, action: PayloadAction<keyof ShipStatusType>) => {
      let targetShipStatus = state.value.opponentBoard.status[action.payload];
      if (targetShipStatus) {
        //prevent the status goes down to 0
        state.value.opponentBoard.status[action.payload]--;
      }
    },
    assignOpponentShips: state => {
      state.value.opponentBoard.placement = computerBoardRandom;
      console.log(state.value.opponentBoard.placement);
    },
    receiveAttack: (state, action: PayloadAction<number>) => {
      let targetShip = state.value.myBoard.placement.find(
        ship => ship.coordinate === action.payload
      );
      if (targetShip === undefined) return;
      state.value.myBoard.status[targetShip.ship as keyof ShipStatusType]--;
    },

    saveToLocalStorage: state => {
      state.value.gameID = Math.floor(Math.random());
      localStorage.setItem(
        JSON.stringify(state.value.gameID),
        JSON.stringify(state)
      );
    },

    createNewGame: state => {},
  },
});

// Other code such as selectors can use the imported `RootState` type
export const {
  insertShip,
  assignOpponentShips,
  attackShip,
  receiveAttack,
  saveToLocalStorage,
} = boardSlice.actions;

export default boardSlice.reducer;
