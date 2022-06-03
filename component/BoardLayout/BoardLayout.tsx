// @ts-nocheck
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import Board from "./Board";
import { useSelector, useDispatch } from "react-redux";
import { assignOpponentShips } from "../../redux/features/boardSlice/boardSlice";
import GameID from "../GameID";
import { RootState } from "../../redux/store";
import { useShipContext } from "../../context/BattleshipContext";

const BoardLayout = (): JSX.Element => {
  const players: { id: number; title: string; canDrag: boolean }[] = [
    {
      id: 1,
      title: "Your Fleet",
      canDrag: true,
    },
    {
      id: 2,
      title: "Enemy Fleet",
      canDrag: false,
    },
  ];
  const { hasGameStarted } = useShipContext();
  const currentGameState = useSelector((state: RootState) => state.board.value);

  const gameID = useSelector((state: RootState) => state.board.value.gameID);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(assignOpponentShips());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasGameStarted) return;
    localStorage.setItem(gameID, JSON.stringify(currentGameState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGameState]);

  return (
    <Box sx={{ position: "relative" }}>
      <GameID title={gameID} />
      <Grid container>
        {players.map(player => {
          return <Board key={player.id} {...player} />;
        })}
      </Grid>
    </Box>
  );
};

export default BoardLayout;
