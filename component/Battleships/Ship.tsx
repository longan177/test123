import { Box } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  size: number;
};

const onDragStart = (name: string) => {
  console.log(name);
};

const Ship = ({ name, size }: Props) => {
  return (
    <Box
      draggable="true"
      onDragStart={() => onDragStart(name)}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        // marginBottom: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: size * 40,
        height: 40,
        color: "#000",
        backgroundColor: "red",
        border: true ? "5px solid darkblue" : "0px",
        opacity: true ? 0.5 : 1,
        "&:hover": {
          // backgroundColor: "yellow",
          opacity: [0.9, 0.8, 0.7],
          cursor: "pointer",
        },
      }}
    />
  );
};

export default Ship;
