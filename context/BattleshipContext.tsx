import React, { useState, useContext } from "react";

type BattleshipsType = {
  id: number;
  name: string;
  size: number;
}[];

const BATTLESHIPS: BattleshipsType = [
  { id: 1, name: "destroyer", size: 2 },
  { id: 2, name: "submarine", size: 3 },
  { id: 3, name: "cruiser", size: 3 },
  { id: 4, name: "battleship", size: 4 },
  { id: 5, name: "carrier", size: 5 },
];

type BattleshipContextType = {
  battleships: BattleshipsType;
};

const BattleshipContext = React.createContext<BattleshipContextType>({
  battleships: BATTLESHIPS,
});
export function useShipContext() {
  return useContext(BattleshipContext);
}

type Props = {
  children: React.ReactNode;
};

const BattleshipProvider = ({ children }: Props): JSX.Element => {
  const [battleships, setBattleships] = useState(BATTLESHIPS);
  let value = { battleships };
  return (
    <BattleshipContext.Provider value={value}>
      {children}
    </BattleshipContext.Provider>
  );
};

export default BattleshipProvider;
