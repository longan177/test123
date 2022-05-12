import React, { useState, useContext } from "react";

export type BattleshipsType = {
  id: number;
  name: string;
  size: number;
  placed: boolean;
}[];

type BattleshipContextType = {
  battleships: BattleshipsType;
  setBattleships: React.Dispatch<React.SetStateAction<BattleshipsType>>;
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

const BATTLESHIPS: BattleshipsType = [
  { id: 1, name: "destroyer", size: 2, placed: false },
  { id: 2, name: "submarine", size: 3, placed: false },
  { id: 3, name: "cruiser", size: 3, placed: false },
  { id: 4, name: "battleship", size: 4, placed: false },
  { id: 5, name: "carrier", size: 5, placed: false },
];

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
let current: { coordinate: number; ship: string }[] = [];
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
  console.log("addedShip", addedShip);
  if (current.some(r => addedShip.includes(r.coordinate))) {
    generateBoard(name);
  } else {
    for (let i = newNum; i < newNum + shipSize; i++) {
      // console.log("added" + i);
      current.push({ coordinate: i, ship: name });
    }
  }

  console.log("current", current);
  // console.log("curernt in generatedBoard", current);
  return current;
};

/* -------------------------------------------------------------------------- */
/*                           generate computer board                          */
/* -------------------------------------------------------------------------- */
const RANDOMIZEDENEMYSHIPS: { coordinate: number; ship: string }[] = [
  ...generateBoard("destroyer"),
  ...generateBoard("submarine"),
  ...generateBoard("cruiser"),
  ...generateBoard("battleship"),
  ...generateBoard("carrier"),
];
console.log("RANDOMIZEDENEMYSHIPS", RANDOMIZEDENEMYSHIPS);

const BattleshipProvider = ({ children }: Props): JSX.Element => {
  const [battleships, setBattleships] = useState(BATTLESHIPS);
  const [isDebugging, setIsDebugging] = useState(false);
  const [currentDrag, setCurrentDrag] = useState(null);
  const [currentFragment, setCurrentFragment] = useState(0);
  const [shipsOnBoard, setShipsOnBoard] = useState([]);
  const [shipsOnOpponentBoard, setShipsOnOpponentBoard] =
    useState(RANDOMIZEDENEMYSHIPS);

  let value = {
    battleships,
    setBattleships,
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
