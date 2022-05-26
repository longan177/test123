import React, { useState, useContext } from "react";

type BattleshipContextType = {
  isDebugging: boolean;
  setIsDebugging: React.Dispatch<React.SetStateAction<boolean>>;
  currentDrag: { name: string; size: number };
  setCurrentDrag: React.Dispatch<
    React.SetStateAction<{ name: string; size: number }>
  >;
  currentFragment: number;
  setCurrentFragment: React.Dispatch<React.SetStateAction<number>>;
  playerGridReceivedAttack: number[];
  setPlayerGridReceivedAttack: React.Dispatch<React.SetStateAction<number[]>>;
  isGameFinish: boolean;
  setIsGameFinish: React.Dispatch<React.SetStateAction<boolean>>;
};

const BattleshipContext = React.createContext<BattleshipContextType | null>(
  null
);
export function useShipContext() {
  const contextValue = useContext(BattleshipContext);
  if (contextValue === null) throw Error;
  return contextValue;
}

type Props = {
  children: React.ReactNode;
};

const BattleshipProvider = ({ children }: Props): JSX.Element => {
  const [isDebugging, setIsDebugging] = useState(false);
  const [currentDrag, setCurrentDrag] = useState(null);
  const [currentFragment, setCurrentFragment] = useState(0);
  const [playerGridReceivedAttack, setPlayerGridReceivedAttack] = useState([]);
  const [isGameFinish, setIsGameFinish] = useState(false);

  let value = {
    isDebugging,
    setIsDebugging,
    currentDrag,
    setCurrentDrag,
    currentFragment,
    setCurrentFragment,
    playerGridReceivedAttack,
    setPlayerGridReceivedAttack,
    isGameFinish,
    setIsGameFinish,
  };
  return (
    <BattleshipContext.Provider value={value}>
      {children}
    </BattleshipContext.Provider>
  );
};

export default BattleshipProvider;
