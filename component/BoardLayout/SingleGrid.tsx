import { Box } from "@mui/material";
import React from "react";
import {
  BattleshipsType,
  useShipContext,
} from "../../context/BattleshipContext";

type Props = {
  coordinate: number;
  canDrag: boolean;
};

const SingleGrid = ({ coordinate, canDrag }: Props): JSX.Element => {
  const {
    battleships,
    setBattleships,
    isDebugging,
    currentDrag,
    currentFragment,
    shipsOnBoard,
    setShipsOnBoard,
  } = useShipContext();

  //Will try to implement and test useCallback hook later in the future when the callback functions grow bigger and bigger,
  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    battleships: BattleshipsType,
    setBattleships: React.Dispatch<React.SetStateAction<BattleshipsType>>,
    coordinate: number,
    currentDrag: { name: string; size: number },
    currentFragment: number,
    shipsOnBoard: number[],
    setShipsOnBoard: React.Dispatch<React.SetStateAction<number[]>>
  ): void => {
    event.preventDefault();
    const { name, size } = currentDrag;
    // console.log(`--------drop-------`, currentDrag);
    let shipLastPosition = coordinate + size - currentFragment;
    const notAllowHorizontal: number[] = [
      1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 12, 22, 32, 42, 52, 62, 72, 82,
      92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93, 4, 14, 24, 34, 44, 54, 64, 74,
      84, 94,
    ];

    const updatedNotAllowHorizontal: number[] = [
      101,
      102,
      103,
      ...notAllowHorizontal.splice(0, (size - 1) * 10),
    ];

    const placeShip = (): void => {
      let placedGrid: number[] = [];
      for (let i = shipLastPosition; i > shipLastPosition - size; i--) {
        placedGrid.push(i);
      }
      const overlapGrid: number[] = shipsOnBoard.filter(value =>
        placedGrid.includes(value)
      );

      if (overlapGrid.length > 0) return;
      for (let i = shipLastPosition; i > shipLastPosition - size; i--) {
        setShipsOnBoard(prev => [...prev, i]);
      }

      // console.log("event from placeship");
      setBattleships(
        battleships.map(b => {
          if (b.name === name) {
            return { ...b, placed: true };
          }
          return b;
        })
      );
    };

    if (!updatedNotAllowHorizontal.includes(shipLastPosition)) {
      placeShip();
    } else {
      // console.log("You are not allowed to place here.");
    }
  };
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const isInvolved = shipsOnBoard.includes(coordinate) && canDrag;
  return (
    <Box
      onDragOver={onDragOver}
      onDrop={e => {
        if (!canDrag) return;
        onDrop(
          e,
          battleships,
          setBattleships,
          coordinate,
          currentDrag,
          currentFragment,
          shipsOnBoard,
          setShipsOnBoard
        );
      }}
      onDragEnter={onDragEnter}
      sx={{
        margin: "0",
        border: "1px solid black",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        backgroundColor: isInvolved && canDrag ? "red" : "#1e9eff",
        // boxShadow: "0 0 0 2px #000",
        transition: "all 0.05s linear",
        "&:hover": {
          backgroundColor: "red",
          cursor: "pointer",
        },
      }}
    >
      {isDebugging && coordinate}
    </Box>
  );
};

export default SingleGrid;
