import { Box } from "@mui/material";
import { Clear } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  insertShip,
  attackShip,
  receiveAttack,
  toggleIsPlaced,
  makeAnAttack,
} from "../../redux/features/boardSlice/boardSlice";
import { useShipContext } from "../../context/BattleshipContext";
import { blueGrey } from "@mui/material/colors";
import { getRandomWithExclude } from "../../redux/features/boardSlice/computerBoardData";

type Props = {
  coordinate: number;
  canDrag: boolean;
};

const SingleGrid = ({ coordinate, canDrag }: Props): JSX.Element => {
  const [isAttack, setIsAttack] = useState(false);
  const [occupiedShip, setOccupiedShip] = useState("");
  const [isDestroyed, setIsDestroyed] = useState(false);
  /* -------------------------------------------------------------------------- */
  /*                              value from redux                              */
  /* -------------------------------------------------------------------------- */

  const shipsOnOpponentBoardRedux = useSelector(
    (state: RootState) => state.board.value.opponentBoard.placement
  );

  const shipsOnMyBoardRedux = useSelector(
    (state: RootState) => state.board.value.myBoard.placement
  );

  const myShipsStatus = useSelector(
    (state: RootState) => state.board.value.myBoard.status
  );

  const opponentShipsStatus = useSelector(
    (state: RootState) => state.board.value.opponentBoard.status
  );

  const hasGameFinished = useSelector(
    (state: RootState) => state.board.value.isGameFinished
  );

  const opponentGridReceivedAttack = useSelector(
    (state: RootState) => state.board.value.opponentBoard.gridReceivedAttack
  );

  const playerGridReceivedAttack = useSelector(
    (state: RootState) => state.board.value.myBoard.gridReceivedAttack
  );

  const dispatch = useDispatch();

  const {
    isDebugging,
    currentDrag,
    currentFragment,
    isStartButtonOn,
    isRotateButtonOn,
  } = useShipContext();

  //Will try to implement and test useCallback hook later in the future when the callback functions grow bigger and bigger,
  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const receivedAttackFromOpponent = () => {
    const randomNumberOneBetweenHundred: number = getRandomWithExclude(1, 100, [
      ...playerGridReceivedAttack,
    ]);

    dispatch(receiveAttack(randomNumberOneBetweenHundred));
  };

  const handleClick = (coordinate: number) => {
    if (isAttack || canDrag || hasGameFinished || !isStartButtonOn) return;
    //if it's opponent board, make an attack!
    if (!canDrag) dispatch(makeAnAttack(coordinate));

    if (
      shipsOnOpponentBoardRedux.some(ship => ship.coordinate === coordinate)
    ) {
      const targetedBattleshipDetail = shipsOnOpponentBoardRedux.find(
        ship => ship.coordinate === coordinate
      );

      dispatch(attackShip(targetedBattleshipDetail.ship));
    }
    receivedAttackFromOpponent();
  };

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    coordinate: number,
    currentDrag: { name: string; size: number },
    currentFragment: number
  ): void => {
    event.preventDefault();
    const { name, size } = currentDrag;
    let shipLastPosition: number;
    if (isRotateButtonOn) {
      shipLastPosition = coordinate - 10 * (size - currentFragment);
    } else {
      shipLastPosition = coordinate + size - currentFragment;
    }
    const notAllowHorizontal: number[] = [
      1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 12, 22, 32, 42, 52, 62, 72, 82,
      92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93, 4, 14, 24, 34, 44, 54, 64, 74,
      84, 94,
    ];

    const updatedNotAllowHorizontal: number[] = [
      101,
      102,
      103,
      104,
      ...notAllowHorizontal.splice(0, (size - 1) * 10),
    ];

    const notAllowVertical: number[] = [
      91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 81, 82, 83, 84, 85, 86, 87, 88,
      89, 90, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 61, 62, 63, 64, 65, 66,
      67, 68, 69, 70,
    ];

    const updateNotAllowVertical: number[] = [
      ...notAllowVertical.splice(0, (size - 1) * 10),
    ];
    const placeShip = (alignment: "horizontal" | "vertical"): void => {
      let placedGrid: number[] = [];
      if (alignment === "horizontal") {
        for (let i = shipLastPosition; i > shipLastPosition - size; i--) {
          placedGrid.push(i);
        }
      } else {
        for (
          let i = shipLastPosition;
          i <= shipLastPosition + (size - 1) * 10;
          i += 10
        ) {
          placedGrid.push(i);
        }
      }
      let existingShipsRedux: number[] = shipsOnMyBoardRedux.map(
        ship => ship.coordinate
      );

      const overlapGridRedux: number[] = existingShipsRedux.filter(value =>
        placedGrid.includes(value)
      );

      if (overlapGridRedux.length > 0) return;
      if (alignment === "horizontal") {
        for (let i = shipLastPosition; i > shipLastPosition - size; i--) {
          dispatch(insertShip({ coordinate: i, ship: name }));
        }
      } else {
        for (
          let i = shipLastPosition;
          i <= shipLastPosition + (size - 1) * 10;
          i += 10
        ) {
          dispatch(insertShip({ coordinate: i, ship: name }));
        }
      }

      dispatch(toggleIsPlaced(name));
    };
    if (
      !updatedNotAllowHorizontal.includes(shipLastPosition) &&
      !isRotateButtonOn
    ) {
      placeShip("horizontal");
    } else if (
      !updateNotAllowVertical.includes(shipLastPosition) &&
      isRotateButtonOn &&
      shipLastPosition > 0
    ) {
      placeShip("vertical");
    } else {
      return;
    }
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const isTakenByComputer = shipsOnOpponentBoardRedux.some(
    s => s.coordinate === coordinate
  );

  useEffect(() => {
    if (canDrag) {
      const currentShip = shipsOnMyBoardRedux.find(
        r => r.coordinate === coordinate
      );
      setOccupiedShip(currentShip?.ship);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipsOnMyBoardRedux]);

  useEffect(() => {
    if (!canDrag) {
      const currentShip = shipsOnOpponentBoardRedux.find(
        r => r.coordinate === coordinate
      );
      setOccupiedShip(currentShip?.ship);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipsOnOpponentBoardRedux]);

  useEffect(() => {
    if (!isAttack) return;
    const targetShip = opponentShipsStatus[occupiedShip];
    if (targetShip === 0 && !canDrag) {
      setIsDestroyed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentShipsStatus, isAttack]);

  useEffect(() => {
    if (!isAttack) return;
    const playerTargetShip = myShipsStatus[occupiedShip];
    if (playerTargetShip === 0 && canDrag) {
      setIsDestroyed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myShipsStatus, isAttack]);

  useEffect(() => {
    if (playerGridReceivedAttack.includes(coordinate) && canDrag) {
      setIsAttack(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerGridReceivedAttack]);

  useEffect(() => {
    if (opponentGridReceivedAttack.includes(coordinate) && !canDrag)
      setIsAttack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentGridReceivedAttack]);

  const battleshipColorStyling = (ship: string) => {
    if (ship === "destroyer") return "purple";
    if (ship === "submarine") return "yellow";
    if (ship === "cruiser") return "cyan";
    if (ship === "battleship") return "pink";
    if (ship === "carrier") return "lightgreen";
  };

  const gridColor = (
    canDrag: boolean,
    isAttack: boolean,
    occupiedShip: string,
    isTakenByComputer: boolean,
    isDebugging: boolean
  ) => {
    if (isDestroyed) return "black";
    if (canDrag && isAttack && occupiedShip) return "#fff";
    if (canDrag && isAttack && !occupiedShip) return "red";
    if (canDrag && !isAttack && occupiedShip)
      return battleshipColorStyling(occupiedShip);
    if (canDrag && !isAttack && !occupiedShip) return "#1e9eff";
    //------------------------------------------------------
    if (!canDrag && isAttack && isTakenByComputer) return "#fff";
    if (!canDrag && isAttack && !isTakenByComputer) return "red";
    if (!canDrag && !isAttack && occupiedShip && !isDebugging) return "#1e9eff";
    if (!canDrag && !isAttack && occupiedShip && isDebugging)
      return battleshipColorStyling(occupiedShip);
    if (!canDrag && !isAttack && !occupiedShip) return "#1e9eff";
  };

  return (
    <Box
      onDragOver={onDragOver}
      onDrop={e => {
        if (!canDrag) return;
        onDrop(e, coordinate, currentDrag, currentFragment);
      }}
      onClick={() => handleClick(coordinate)}
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

        backgroundColor: gridColor(
          canDrag,
          isAttack,
          occupiedShip,
          isTakenByComputer,
          isDebugging
        ),
        transition: "all 0.05s linear",
        "&:hover": {
          backgroundColor: !isAttack && blueGrey[200],
          cursor: "pointer",
        },
      }}
    >
      <Box sx={{ position: "absolute" }}>{isDebugging && coordinate}</Box>

      {isAttack && <Clear fontSize="large" />}
    </Box>
  );
};

export default SingleGrid;
