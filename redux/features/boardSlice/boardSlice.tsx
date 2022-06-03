// @ts-nocheck
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import computerBoardRandom from "./computerBoardData";
export type ShipStatusType = {
  destroyer: number;
  submarine: number;
  battleship: number;
  cruiser: number;
  carrier: number;
};

export type BattleshipsType = {
  id: number;
  name: string;
  size: number;
  placed: boolean;
}[];

export type BoardType = {
  value: {
    gameID: string;
    playerBattleshipState: BattleshipsType;
    isGameFinished: boolean;
    myBoard: {
      placement: { coordinate: number; ship: string }[];
      status: ShipStatusType;
      gridReceivedAttack: number[];
    };

    opponentBoard: {
      placement: { coordinate: number; ship: string }[];
      status: ShipStatusType;
      gridReceivedAttack: number[];
    };
    name: string;
    result: string;
  };
};
const initialBattleshipState: BattleshipsType = [
  { id: 1, name: "destroyer", size: 2, placed: false },
  { id: 2, name: "submarine", size: 3, placed: false },
  { id: 3, name: "cruiser", size: 3, placed: false },
  { id: 4, name: "battleship", size: 4, placed: false },
  { id: 5, name: "carrier", size: 5, placed: false },
];

const initialShipStatus: ShipStatusType = {
  destroyer: 2,
  submarine: 3,
  cruiser: 3,
  battleship: 4,
  carrier: 5,
};

// Define the initial state using that type
const initialState: BoardType = {
  value: {
    gameID: " ",
    playerBattleshipState: initialBattleshipState,
    isGameFinished: false,
    myBoard: {
      placement: [],
      status: { ...initialShipStatus },
      gridReceivedAttack: [],
    },
    opponentBoard: {
      placement: [],
      status: { ...initialShipStatus },
      gridReceivedAttack: [],
    },
    name: "Anonymous",
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

    toggleIsPlaced: (state, action) => {
      const targetShipIndex = state.value.playerBattleshipState.findIndex(
        ship => ship.name === action.payload
      );
      state.value.playerBattleshipState[targetShipIndex].placed = true;
    },

    makeAnAttack: (state, action) => {
      state.value.opponentBoard.gridReceivedAttack.push(action.payload);
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
    },
    receiveAttack: (state, action: PayloadAction<number>) => {
      state.value.myBoard.gridReceivedAttack.push(action.payload);
      let targetShip = state.value.myBoard.placement.find(
        ship => ship.coordinate === action.payload
      );
      if (targetShip === undefined) return;
      state.value.myBoard.status[targetShip.ship as keyof ShipStatusType]--;
    },

    createNewGame: state => {
      const localDataLength = localStorage.length;
      const generateNewID = (number: number) => {
        const currentNum = number.toString();
        return currentNum.padStart(6, "0");
      };
      state.value.gameID = generateNewID(localDataLength + 1);
      localStorage.setItem(state.value.gameID, JSON.stringify(state.value));
    },

    stopTheGame: state => {
      state.value.isGameFinished = true;
    },

    loadGameID: (state, action) => {
      state.value = action.payload;
    },

    submitResult: (
      state,
      action: PayloadAction<{ nameInput: string; currentWinner: string }>
    ) => {
      state.value.isGameFinished = true;
      state.value.name = action.payload.nameInput;
      state.value.result = action.payload.currentWinner;
      localStorage.setItem(state.value.gameID, JSON.stringify(state.value));
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const {
  insertShip,
  assignOpponentShips,
  attackShip,
  makeAnAttack,
  receiveAttack,
  createNewGame,
  toggleIsPlaced,
  submitResult,
  stopTheGame,
  loadGameID,
} = boardSlice.actions;

export default boardSlice.reducer;
