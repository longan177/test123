import { Box } from "@mui/material";
import React from "react";
import { useShipContext } from "../../context/BattleshipContext";

type Props = {
  coordinateX: number;
  coordinateY: number;
};

const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  console.log(`dragover`);
};

const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  console.log(`drop`);
};
const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  console.log(`DragEnter`);
};

const SingleGrid = ({ coordinateX, coordinateY }: Props) => {
  return (
    <Box
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      className={`grid-cell grid-cell-${coordinateX}-${coordinateY} grid-empty`}
      sx={{
        margin: "0",
        border: "1px solid black",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        backgroundColor: "#1e9eff",
        // boxShadow: "0 0 0 2px #000",
        transition: "all 0.05s linear",
        "&:hover": {
          backgroundColor: "red",
          cursor: "pointer",
        },
      }}
    ></Box>
  );
};

export default SingleGrid;
