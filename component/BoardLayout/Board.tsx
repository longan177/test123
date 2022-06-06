// @ts-nocheck
import { Grid, Typography, Box } from "@mui/material";
import { textAlign } from "@mui/system";
import { useState } from "react";
import SingleGrid from "./SingleGrid";
import Image from "next/image";

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

  const [cursor, setCursor] = useState({});
  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const percentX = Math.floor((offsetX * 100) / 518);
    const percentY = Math.floor((offsetY * 100) / 518);
    setCursor({ percentX, percentY });
  };

  var backgroundColor = `url("https://static.wikia.nocookie.net/naruto/images/d/dc/Naruto%27s_Sage_Mode.png/revision/latest?cb=20150124180545")`;

  var backgroundColor = `radial-gradient(
     50px at ${10 + cursor.percentX}% ${cursor.percentY}%,  #3498db, #9b59b6
     )`;
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
        onMouseMove={e => {
          handleMouseMove(e);
        }}
        sx={{
          margin: "0 auto",

          width: "518px",
          display: "grid",
          gridTemplateColumns: "repeat(10,50px)",
          gap: "2px",
          justifyContent: "center",
        }}
      >
        {totalGrid.map(grid => {
          return (
            <SingleGrid
              bgColor={backgroundColor}
              canDrag={canDrag}
              coordinate={grid}
              key={grid}
            />
          );
        })}
      </Box>
    </Grid>
  );
};

export default Board;
