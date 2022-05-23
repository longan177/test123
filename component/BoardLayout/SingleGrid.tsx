import { Box } from "@mui/material";
import { Clear } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsPlaced } from "../../redux/features/battleshipSlice/battleshipSlice";
import {
  insertShip,
  attackShip,
  receiveAttack,
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

  const dispatch = useDispatch();

  const {
    isDebugging,
    currentDrag,
    currentFragment,
    playerGridReceivedAttack,
    setPlayerGridReceivedAttack,
    isGameFinish,
  } = useShipContext();

  //Will try to implement and test useCallback hook later in the future when the callback functions grow bigger and bigger,
  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const receivedAttackFromOpponent = () => {
    const randomNumberOneBetweenHundred: number = getRandomWithExclude(
      1,
      100,
      playerGridReceivedAttack
    );

    setPlayerGridReceivedAttack(prev => [
      ...prev,
      randomNumberOneBetweenHundred,
    ]);
    dispatch(receiveAttack(randomNumberOneBetweenHundred));
  };

  const handleClick = (coordinate: number) => {
    if (isAttack || canDrag || isGameFinish) return;
    if (shipsOnMyBoardRedux.length !== 17)
      return console.log("player havent ready yet!!");
    //Find the corresponding battleship
    setIsAttack(true);

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
      let existingShipsRedux: number[] = shipsOnMyBoardRedux.map(
        ship => ship.coordinate
      );

      const overlapGridRedux: number[] = existingShipsRedux.filter(value =>
        placedGrid.includes(value)
      );

      if (overlapGridRedux.length > 0) return;

      for (let i = shipLastPosition; i > shipLastPosition - size; i--) {
        dispatch(insertShip({ coordinate: i, ship: name }));
      }

      // console.log("event from placeship");

      dispatch(toggleIsPlaced(name));
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

  const isTakenByComputer = shipsOnOpponentBoardRedux.some(
    s => s.coordinate === coordinate
  );

  useEffect(() => {
    const targetShip = opponentShipsStatus[occupiedShip];
    if (targetShip === 0 && !canDrag) {
      setIsDestroyed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentShipsStatus]);

  useEffect(() => {
    const playerTargetShip = myShipsStatus[occupiedShip];
    if (playerTargetShip === 0 && canDrag) {
      setIsDestroyed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myShipsStatus]);

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
  }, []);

  useEffect(() => {
    if (playerGridReceivedAttack.includes(coordinate) && canDrag) {
      setIsAttack(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerGridReceivedAttack]);

  const battleshipColorStyling = (ship: string): string => {
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

      {isAttack && occupiedShip && <Clear fontSize="large" />}
    </Box>
  );
};

export default SingleGrid;
