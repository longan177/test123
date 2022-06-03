// @ts-nocheck
import { Grid, Typography, Box } from "@mui/material";
import SingleGrid from "./SingleGrid";

type Props = {
  id: number;
  title: string;
  canDrag: boolean;
};

const Board = ({ id, title, canDrag }: Props) => {
  const totalGrid: number[] = [];
  for (let i = 1; i <= 100; i++) {
    totalGrid.push(i);
  }

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
          gridTemplateColumns: "repeat(10,50px)",
          gap: "2px",
          justifyContent: "center",
        }}
      >
        {totalGrid.map(grid => {
          return <SingleGrid canDrag={canDrag} coordinate={grid} key={grid} />;
        })}
      </Box>
    </Grid>
  );
};

export default Board;
