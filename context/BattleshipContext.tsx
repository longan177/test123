import React, { useState, useEffect, useContext } from "react";

type battleshipsType = {
  id: number;
  name: string;
  size: number;
}[];

const BATTLESHIPS: battleshipsType = [
  { id: 1, name: "destroyer", size: 2 },
  { id: 2, name: "submarine", size: 3 },
  { id: 3, name: "cruiser", size: 3 },
  { id: 4, name: "battleship", size: 4 },
  { id: 5, name: "carrier", size: 5 },
];

type battleshipContextType = {
  battleships: battleshipsType;
};

const BattleshipContext = React.createContext<battleshipContextType>({
  battleships: BATTLESHIPS,
});
export function useShipContext() {
  return useContext(BattleshipContext);
}

type Props = {
  children: React.ReactNode;
};

const BattleshipProvider = ({ children }: Props) => {
  const [battleships, setBattleships] = useState(BATTLESHIPS);
  let value = { battleships };
  return (
    <BattleshipContext.Provider value={value}>
      {children}
    </BattleshipContext.Provider>
  );
};

export default BattleshipProvider;
