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

const Ships = (): JSX.Element => {
  const { isDebugging, setIsDebugging, shipsOnBoard } = useShipContext();

  const battleShipRedux = useSelector(
    (state: RootState) => state.battleships.value
  );

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
          <Alert severity="info">
            {shipsOnBoard.map((ship, i) => (
              <li key={i}>{JSON.stringify(ship)}</li>
            ))}
          </Alert>
          <Alert severity="success">{JSON.stringify(battleShipRedux)}</Alert>
        </>
      )}
      {/* ----------------For debugging purpose only---------------- */}
    </Box>
  );
};

export default Ships;
