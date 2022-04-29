import { Box } from "@mui/material";
import { useShipContext } from "../../context/BattleshipContext";
import Ship from "./Ship";

const Ships = (): JSX.Element => {
  const { battleships } = useShipContext();
  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
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
