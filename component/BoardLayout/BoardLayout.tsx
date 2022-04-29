import { Grid, Typography, Box } from "@mui/material";
import SingleGrid from "./SingleGrid";

const BoardLayout = (): JSX.Element => {
  const totalGrid: number[][] = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      totalGrid.push([i, j]);
    }
  }

  const players: { id: number; title: string }[] = [
    {
      id: 1,
      title: "Your Fleet",
    },
    {
      id: 2,
      title: "Enemy Fleet",
    },
  ];

  return (
    <Grid container>
      {players.map(player => {
        const { id, title } = player;
        return (
          <Grid key={id} alignContent="center" item md={6}>
            <Typography
              sx={{ margin: "1rem 0 1rem 0", fontSize: "2rem" }}
              variant="h2"
              align="center"
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(10,40px)",
                gap: "0px",
                justifyContent: "center",
              }}
            >
              {totalGrid.map(grid => {
                const [x, y] = grid;
                return <SingleGrid key={`${x}${y}`} />;
              })}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BoardLayout;
