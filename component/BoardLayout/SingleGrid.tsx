import { Box } from "@mui/material";
import React from "react";

const SingleGrid = (): JSX.Element => {
  //Will try to implement and test useCallback hook later in the future when the callback functions grow bigger and bigger,
  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    console.log(`dragover`);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    console.log(`drop`);
  };
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    console.log(`DragEnter`);
  };
  return (
    <Box
      onDragOver={onDragOver}
      onDrop={onDrop}
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
        backgroundColor: "#1e9eff",
        // boxShadow: "0 0 0 2px #000",
        transition: "all 0.05s linear",
        "&:hover": {
          backgroundColor: "red",
          cursor: "pointer",
        },
      }}
    />
  );
};

export default SingleGrid;
