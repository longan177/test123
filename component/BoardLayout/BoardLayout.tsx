import { Grid, Typography, Box } from "@mui/material";
import Board from "./Board";
import SingleGrid from "./SingleGrid";

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

  return (
    <Grid container>
      {players.map(player => {
        return <Board key={player.id} {...player} />;
      })}
    </Grid>
  );
};

export default BoardLayout;
