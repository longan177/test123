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
  hasGameStarted: boolean;
  sethasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isStartButtonOn: boolean;
  setIsStartButtonOn: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [hasGameStarted, sethasGameStarted] = useState<boolean>(false);
  const [isStartButtonOn, setIsStartButtonOn] =
    useState<BattleshipContextType["isStartButtonOn"]>(false);

  let value = {
    isDebugging,
    setIsDebugging,
    currentDrag,
    setCurrentDrag,
    currentFragment,
    setCurrentFragment,
    hasGameStarted,
    sethasGameStarted,
    isStartButtonOn,
    setIsStartButtonOn,
  };
  return (
    <BattleshipContext.Provider value={value}>
      {children}
    </BattleshipContext.Provider>
  );
};

export default BattleshipProvider;
