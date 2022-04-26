import { Grid, Typography } from "@mui/material";
import React from "react";
import SingleGrid from "./SingleGrid";
import styles from "./BoardLayout.module.css";

type Props = {};

const BoardLayout = (props: Props) => {
  const totalGrid: any[] = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      totalGrid.push([i, j]);
    }
  }

  const players = [
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
              mb={1}
              mt={1}
              sx={{ fontSize: "2rem" }}
              variant="h2"
              align="center"
            >
              {title}
            </Typography>
            <div className={`grid human-player ${styles.gridContainer}`}>
              {totalGrid.map(grid => {
                const [x, y] = grid;
                return (
                  <SingleGrid
                    coordinateX={x}
                    coordinateY={y}
                    key={`${x}${y}`}
                  />
                );
              })}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BoardLayout;
