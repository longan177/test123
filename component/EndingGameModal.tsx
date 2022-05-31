import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, FormEvent } from "react";
import { TextField, Typography, Fade, Modal, Box, Button } from "@mui/material";
import {
  stopTheGame,
  submitResult,
} from "../redux/features/boardSlice/boardSlice";

const TransitionsModal = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [hasSubmited, setHasSubmited] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [currentWinner, setCurrentWinner] = useState<string>("");

  const hasGameFinished = useSelector(
    (state: RootState) => state.board.value.isGameFinished
  );

  const playerShipStatus = useSelector(
    (state: RootState) => state.board.value.myBoard.status
  );

  const opponentShipStatus = useSelector(
    (state: RootState) => state.board.value.opponentBoard.status
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const totalOpponentHP: number = Object.values(opponentShipStatus).reduce(
      (prev, current) => current + prev,
      0
    );

    const totalPlayerHP: number = Object.values(playerShipStatus).reduce(
      (prev, current) => prev + current,
      0
    );

    if (!totalOpponentHP || !totalPlayerHP) {
      if (!hasGameFinished) setOpen(true);
      setCurrentWinner(!totalOpponentHP ? "Player1" : "Player2");
      dispatch(stopTheGame());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentShipStatus, playerShipStatus]);

  const resultMsg = (
    player: string
  ): { msgTitle: string; msgDetail: string } => ({
    msgTitle: player === "Player1" ? "Congratulation!" : "Sorry!",
    msgDetail: player === "Player1" ? "You Win!" : "You Lose!",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmited(true);
    dispatch(submitResult({ nameInput, currentWinner }));
  };
  const handleChange = (value: string) => {
    // if (nameInput.length === 15) return;
    //Allow alphebet only and empty string and space
    if (/^[a-zA-Z ]*$/.test(value) || value === "") {
      setNameInput(value);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: currentWinner === "Player1" ? "#f7ec1b" : "#a30505",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              align="center"
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                color: currentWinner === "Player1" ? "#000" : "#fff",
              }}
            >
              {resultMsg(currentWinner).msgTitle}
            </Typography>
            <Typography
              align="center"
              id="transition-modal-description"
              sx={{
                mt: 2,
                color: currentWinner === "Player1" ? "#000" : "#fff",
              }}
            >
              {resultMsg(currentWinner).msgDetail}
            </Typography>
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {hasSubmited ? (
                <Typography variant="h5" component="div">
                  Thank you for your response
                </Typography>
              ) : (
                <form onSubmit={e => handleSubmit(e)}>
                  <TextField
                    inputProps={{ maxLength: 15 }}
                    size="small"
                    label="Please enter your name"
                    type="text"
                    value={nameInput}
                    onChange={e => handleChange(e.target.value)}
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    disabled={nameInput.length < 3}
                    sx={{
                      display: "inline-block",
                      height: "100%",
                      flex: 1,
                    }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
