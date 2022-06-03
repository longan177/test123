// @ts-nocheck
import { Chip } from "@mui/material";

type Props = {
  title: string;
};

const GameID = ({ title }: Props) => {
  return (
    <Chip
      sx={{
        position: "absolute",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "1rem",
      }}
      color="secondary"
      label={`Game ID : ${title}`}
    ></Chip>
  );
};

export default GameID;
