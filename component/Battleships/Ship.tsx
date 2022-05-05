import { Box } from "@mui/material";
import { useShipContext } from "../../context/BattleshipContext";

type Props = {
  name: string;
  size: number;
  placed: boolean;
};

const Ship = ({ name, size, placed }: Props): JSX.Element => {
  const {
    isDebugging,
    currentDrag,
    setCurrentDrag,
    currentFragment,
    setCurrentFragment,
  } = useShipContext();
  //Just to detect if the ship is being dragged.
  const onDragStart = (name: string): void => {
    console.log(`dragstart`, name, size);
    setCurrentDrag({ name, size });
  };

  const getPositionShip = (e: React.MouseEvent<HTMLDivElement>) => {
    let fragment;
    let clickedPosition = e.nativeEvent.offsetX;
    switch (true) {
      case clickedPosition <= 40:
        fragment = 1;
        break;
      case clickedPosition <= 80:
        fragment = 2;
        break;
      case clickedPosition <= 120:
        fragment = 3;
        break;
      case clickedPosition <= 160:
        fragment = 4;
        break;
      case clickedPosition <= 200:
        fragment = 5;
        break;

      default:
        fragment = null;
    }
    setCurrentFragment(fragment);
  };

  const debuggingGrid = isDebugging && {
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
  };

  return (
    <Box
      draggable="true"
      onDragStart={() => onDragStart(name)}
      onMouseDown={e => getPositionShip(e)}
      sx={{
        ...debuggingGrid,
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        width: size * 40,
        height: 40,
        visibility: placed ? "hidden" : "visible",
        color: "#000",
        backgroundColor: "red",
        border: true ? "5px solid darkblue" : "0px",
        opacity: true ? 0.5 : 1,
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
          cursor: "pointer",
        },
      }}
    />
  );
};

export default Ship;
