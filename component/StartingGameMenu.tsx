import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { red, yellow } from "@mui/material/colors";
import { Box, TextField, Alert } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewGame } from "../redux/features/boardSlice/boardSlice";
import Button from "./Button";

const TEMP_LOCALSTORAGE: number[] = []; //temporary s
const StartingGameMenu = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);
  const [isGameIDNotFound, setIsGameIDNotFound] = useState<boolean>(false);
  const [gameIDInput, setGameIDInput] = useState<"">("");
  const dispatch = useDispatch();

  const handleInput = (value: any): void => {
    if (isNaN(value)) return;
    setGameIDInput(value);
    setIsGameIDNotFound(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!TEMP_LOCALSTORAGE.includes(+gameIDInput)) {
      setIsGameIDNotFound(true);
    }
  };

  const handleStart = () => {
    newSingleGame();
  };

  const newSingleGame = () => {
    setOpen(false);
    dispatch(createNewGame());
  };
  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            outline: "none",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 400,
            bgcolor: red[400],
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "0 auto",
              width: "50%",
              height: "100%",
            }}
          >
            <Button onClick={handleStart}>New Game</Button>
            <form onSubmit={e => handleSubmit(e)}>
              <Button type="submit" disabled={gameIDInput.length < 6}>
                Load Game
              </Button>
              <Typography
                variant="h6"
                sx={{ fontSize: "1rem" }}
                component="label"
                htmlFor="form-input--name"
              >
                Game ID:
              </Typography>
              <TextField
                sx={{
                  width: "100%",
                  position: "relative",
                  "&::after": {
                    content: `"(6 digit number)"`,
                    position: "absolute",
                    right: "-55%",
                    top: "50%",
                    transform: "translateY(-50%)",
                  },
                }}
                id="form-input--name"
                color="secondary"
                variant="outlined"
                placeholder="eg:123456"
                inputProps={{ maxLength: 6, sx: { padding: "0.65rem" } }}
                value={gameIDInput}
                onChange={e => handleInput(e.target.value)}
              ></TextField>
            </form>
            <Alert
              sx={{
                visibility: !isGameIDNotFound ? "hidden" : "initial",
                marginTop: "1rem",
              }}
              variant="filled"
              severity="warning"
            >
              Game ID Not Found!
            </Alert>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default StartingGameMenu;