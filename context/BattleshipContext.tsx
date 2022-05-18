import React, { useState, useContext } from "react";

export type BattleshipsType = {
  id: number;
  name: string;
  size: number;
  placed: boolean;
}[];

type BattleshipContextType = {
  isDebugging: boolean;
  setIsDebugging: React.Dispatch<React.SetStateAction<boolean>>;
  currentDrag: { name: string; size: number };
  setCurrentDrag: React.Dispatch<
    React.SetStateAction<{ name: string; size: number }>
  >;
  currentFragment: number;
  setCurrentFragment: React.Dispatch<React.SetStateAction<number>>;
  shipsOnBoard: { coordinate: number; ship: string }[];
  setShipsOnBoard: React.Dispatch<
    React.SetStateAction<{ coordinate: number; ship: string }[]>
  >;
  shipsOnOpponentBoard: { coordinate: number; ship: string }[];
  setShipsOnOpponentBoard: React.Dispatch<
    React.SetStateAction<{ coordinate: number; ship: string }[]>
  >;
};

const BattleshipContext = React.createContext<BattleshipContextType | null>(
  null
);
export function useShipContext() {
  return useContext(BattleshipContext);
}

type Props = {
  children: React.ReactNode;
};

/* -------------------------------------------------------------------------- */
/*                           generate computer board                          */
/* -------------------------------------------------------------------------- */
let computerBoardRandom: { coordinate: number; ship: string }[] = [];
const generateBoard = (name: string) => {
  const shipSize = (() => {
    if (name === "destroyer") return 2;
    if (name === "submarine") return 3;
    if (name === "cruiser") return 3;
    if (name === "battleship") return 4;
    if (name === "carrier") return 5;
  })();

  const getRandomWithExclude = (
    min: number,
    max: number,
    excludeArray: number[]
  ) => {
    const randomNumber =
      Math.floor(Math.random() * (max - min + 1 - excludeArray.length)) + min;
    return (
      randomNumber +
      excludeArray
        .sort((a, b) => a - b)
        .reduce((acc, element) => {
          return randomNumber >= element - acc ? acc + 1 : acc;
        }, 0)
    );
  };

  let notAllowHorizontal: number[] = [
    7, 17, 27, 37, 47, 57, 67, 77, 87, 97, 8, 18, 28, 38, 48, 58, 68, 78, 88,
    98, 9, 19, 29, 39, 49, 59, 69, 79, 89, 99, 10, 20, 30, 40, 50, 60, 70, 80,
    90, 100,
  ];

  const updatedNotAllowHorizontal: number[] = [
    ...notAllowHorizontal.splice(-(shipSize - 1) * 10),
  ];

  // console.log("not allow for", num, updatedNotAllowHorizontal);
  let addedShip: number[] = [];

  const newNum: number = getRandomWithExclude(
    1,
    100,
    updatedNotAllowHorizontal
  );
  for (let i = newNum; i < newNum + shipSize; i++) {
    addedShip.push(i);
  }
  // console.log("addedShip", addedShip);
  if (computerBoardRandom.some(r => addedShip.includes(r.coordinate))) {
    generateBoard(name);
  } else {
    for (let i = newNum; i < newNum + shipSize; i++) {
      // console.log("added" + i);
      computerBoardRandom.push({ coordinate: i, ship: name });
    }
  }

  // console.log("computerBoardRandhhghggghgdgfhrthfghfghdfgfhfgdhhggghgnom", computerBoardRandom);
};

const battleshipList = [
  "destroyer",
  "submarine",
  "cruiser",
  "battleship",
  "carrier",
];
battleshipList.forEach(ship => generateBoard(ship));

/* -------------------------------------------------------------------------- */
/*                           generate computer board                          */
/* -------------------------------------------------------------------------- */

const BattleshipProvider = ({ children }: Props): JSX.Element => {
  const [isDebugging, setIsDebugging] = useState(false);
  const [currentDrag, setCurrentDrag] = useState(null);
  const [currentFragment, setCurrentFragment] = useState(0);
  const [shipsOnBoard, setShipsOnBoard] = useState([]);
  const [shipsOnOpponentBoard, setShipsOnOpponentBoard] =
    useState(computerBoardRandom);

  let value = {
    isDebugging,
    setIsDebugging,
    currentDrag,
    setCurrentDrag,
    currentFragment,
    setCurrentFragment,
    shipsOnBoard,
    setShipsOnBoard,
    shipsOnOpponentBoard,
    setShipsOnOpponentBoard,
  };
  return (
    <BattleshipContext.Provider value={value}>
      {children}
    </BattleshipContext.Provider>
  );
};

export default BattleshipProvider;
