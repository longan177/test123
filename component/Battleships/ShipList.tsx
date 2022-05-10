import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
  Alert,
} from "@mui/material";
import { useShipContext } from "../../context/BattleshipContext";
import Ship from "./Ship";

const Ships = (): JSX.Element => {
  const { battleships, isDebugging, setIsDebugging, shipsOnBoard } =
    useShipContext();
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
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          aligItems: "center",
          gap: "1rem",
        }}
      >
        {battleships.map((ship, i) => {
          return <Ship key={i} {...ship} />;
        })}
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
          <Alert severity="success">{JSON.stringify(battleships)}</Alert>
        </>
      )}
      {/* ----------------For debugging purpose only---------------- */}
    </Box>
  );
};

export default Ships;
