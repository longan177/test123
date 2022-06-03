// @ts-nocheck
import { Box } from "@mui/material";
import { useShipContext } from "../../context/BattleshipContext";

type Props = {
  name: string;
  size: number;
  placed: boolean;
  isRotateButtonOn: boolean;
};

const Ship = ({ name, size, placed, isRotateButtonOn }: Props): JSX.Element => {
  const { isDebugging, setCurrentDrag, setCurrentFragment } = useShipContext();
  //Just to detect if the ship is being dragged.
  const onDragStart = (name: string): void => {
    // console.log(`dragstart`, name, size);
    setCurrentDrag({ name, size });
  };

  const getPositionShip = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRotateButtonOn) {
      setCurrentFragment(Math.ceil(e.nativeEvent.offsetX / 40));
    } else {
      setCurrentFragment(Math.ceil((size * 40 - e.nativeEvent.offsetY) / 40));
    }
  };

  // const debuggingGrid = ;

  return (
    <Box
      draggable="true"
      onDragStart={() => onDragStart(name)}
      onMouseDown={e => getPositionShip(e)}
      sx={[
        isDebugging &&
          !isRotateButtonOn && {
            "&::before": {
              content: `""`,
              width: "2px",
              backgroundColor: "gold",
              display: "block",
              height: "100%",
              marginLeft: "35px",
              paddingLeft: "40px",
              boxShadow: " 40px 0 0 black,80px 0 0 red,120px 0 0 black",
            },
          },
        isDebugging &&
          isRotateButtonOn && {
            "&::before": {
              content: `""`,
              height: "2px",
              backgroundColor: "gold",
              display: "block",
              width: "100%",
              marginTop: "35px",
              paddingTop: "40px",
              boxShadow: " 0 40px 0 black,0 80px 0 red,0 120px 0 black",
            },
          },
        {
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          width: isRotateButtonOn ? 40 : size * 40,
          height: isRotateButtonOn ? size * 40 : 40,
          marginLeft: isRotateButtonOn ? "2rem" : "",
          visibility: placed ? "hidden" : "visible",
          color: "#000",
          backgroundColor: "red",
          border: true ? "5px solid darkblue" : "0px",
          opacity: true ? 0.5 : 1,
          "&:hover": {
            opacity: [0.9, 0.8, 0.7],
            cursor: "pointer",
          },
        },
      ]}
    />
  );
};

export default Ship;
