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
  shipsOnBoard: number[];
  setShipsOnBoard: React.Dispatch<React.SetStateAction<number[]>>;
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

const BattleshipProvider = ({ children }: Props): JSX.Element => {
  const [battleships, setBattleships] = useState(BATTLESHIPS);
  const [isDebugging, setIsDebugging] = useState(true);
  const [currentDrag, setCurrentDrag] = useState(null);
  const [currentFragment, setCurrentFragment] = useState(0);
  const [shipsOnBoard, setShipsOnBoard] = useState([]);

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
  };
  return (
    <BattleshipContext.Provider value={value}>
      {children}
    </BattleshipContext.Provider>
  );
};

export default BattleshipProvider;
