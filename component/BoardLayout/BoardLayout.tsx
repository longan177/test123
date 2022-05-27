import { Grid } from "@mui/material";
import { useEffect } from "react";
import Board from "./Board";
import { useDispatch } from "react-redux";
import { assignOpponentShips } from "../../redux/features/boardSlice/boardSlice";

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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(assignOpponentShips());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      {players.map(player => {
        return <Board key={player.id} {...player} />;
      })}
    </Grid>
  );
};

export default BoardLayout;
