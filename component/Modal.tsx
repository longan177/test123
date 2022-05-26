import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useShipContext } from "../context/BattleshipContext";

const TransitionsModal = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [currentWinner, setCurrentWinner] = useState("");
  const { setIsGameFinish } = useShipContext();
  const playerShipStatus = useSelector(
    (state: RootState) => state.board.value.myBoard.status
  );

  const opponentShipStatus = useSelector(
    (state: RootState) => state.board.value.opponentBoard.status
  );

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
      handleOpen();
      setIsGameFinish(true);
      setCurrentWinner(!totalOpponentHP ? "Player1" : "Player2");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentShipStatus, playerShipStatus]);

  const resultMsg = (
    player: string
  ): { msgTitle: string; msgDetail: string } => ({
    msgTitle: player === "Player1" ? "Congratulation!" : "Sorry!",
    msgDetail: player === "Player1" ? "You Win!" : "You Lose!",
  });

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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
