import { Box, FormControlLabel, Switch } from "@mui/material";
import { useShipContext } from "../../context/BattleshipContext";
import Ship from "./Ship";

const Ships = (): JSX.Element => {
  const { battleships, isDebugging, setIsDebugging } = useShipContext();
  return (
    <Box
      sx={{
        padding: "1rem",
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
          display: "block",
          margin: "auto",
          textAlign: "center",
        }}
      />

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
    </Box>
  );
};

export default Ships;
