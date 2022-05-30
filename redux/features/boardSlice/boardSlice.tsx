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
    };

    opponentBoard: {
      placement: { coordinate: number; ship: string }[];
      status: ShipStatusType;
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

    toggleIsPlaced: (state, action) => {
      const targetShipIndex = state.value.playerBattleshipState.findIndex(
        ship => ship.name === action.payload
      );
      state.value.playerBattleshipState[targetShipIndex].placed = true;
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
      localStorage.setItem(
        JSON.stringify(state.value.gameID),
        JSON.stringify(state.value)
      );
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const {
  insertShip,
  assignOpponentShips,
  attackShip,
  receiveAttack,
  createNewGame,
  toggleIsPlaced,
} = boardSlice.actions;

export default boardSlice.reducer;
