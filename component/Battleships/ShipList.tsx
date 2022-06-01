import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
  Alert,
} from "@mui/material";
import { useShipContext } from "../../context/BattleshipContext";
import Ship from "./Ship";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Button from "../Button";

const Ships = (): JSX.Element => {
  const { isDebugging, setIsDebugging, setIsStartButtonOn, isStartButtonOn } =
    useShipContext();

  const battleShipRedux = useSelector(
    (state: RootState) => state.board.value.playerBattleshipState
  );

  //If player placed all his ship, 2+3+3+4+5 =17!
  const isPlayerReady =
    useSelector((state: RootState) => state.board.value.myBoard.placement)
      .length === 17;

  console.log(isPlayerReady);
  const boardRedux = useSelector((state: RootState) => state.board.value);
  const handleClick = () => {
    setIsStartButtonOn(true);
  };
  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={isDebugging}
              onChange={e => {
                setIsDebugging(!isDebugging);
              }}
              color="primary"
            />
          }
          label={`Debugging Mode : ${isDebugging ? "On" : "Off"}`}
          labelPlacement="end"
          sx={{
            margin: "auto",
            textAlign: "center",
          }}
        />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button sx={{ width: "initial", marginRight: "1rem" }}>
          Rotate Ship
        </Button>
        <Button
          disabled={!isPlayerReady}
          onClick={handleClick}
          sx={{ width: "initial" }}
        >
          Start Game
        </Button>
      </Box>
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          aligItems: "center",
          gap: "1rem",
        }}
      >
        {battleShipRedux.map((ship, i) => (
          <Ship key={i} {...ship} />
        ))}
      </Box>
      {/* ----------------For debugging purpose only---------------- */}
      {isDebugging && (
        <>
          {" "}
          <Typography mt={4} textAlign="center" variant="h4" component="div">
            {" "}
            Debugging Info
          </Typography>
          Redux version --- MyBoard
          {/* <Alert severity="info">
            {boardRedux.myBoard.placement.map((ship, i) => (
              <li key={i}>{JSON.stringify(ship)}</li>
            ))}
          </Alert>
          Redux version --- Opponent Board
          <Alert severity="info">
            {boardRedux.opponentBoard.placement.map((ship, i) => (
              <li key={i}>{JSON.stringify(ship)}</li>
            ))}
          </Alert> */}
          Opponent Ships Status
          <Alert severity="info">
            {JSON.stringify(boardRedux.opponentBoard.status)}
          </Alert>
          My Ships Status
          <Alert severity="info">
            {JSON.stringify(boardRedux.myBoard.status)}
          </Alert>
          <Alert severity="success">{JSON.stringify(battleShipRedux)}</Alert>
          <Alert severity="success">
            {boardRedux.myBoard.placement.length}
          </Alert>
        </>
      )}
      {/* ----------------For debugging purpose only---------------- */}
    </Box>
  );
};

export default Ships;
