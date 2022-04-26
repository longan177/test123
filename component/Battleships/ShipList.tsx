import { Box, Typography } from "@mui/material";
import React from "react";
import { useShipContext } from "../../context/BattleshipContext";
import styles from "./Battleships.module.css";
import Ship from "./Ship";

type Props = {};

const Ships = (props: Props) => {
  const { battleships } = useShipContext();
  console.log(battleships);
  return (
    <div className={styles.battleshipsContainer}>
      <div className={styles.shiplist}>
        {battleships.map((ship, i) => {
          return <Ship key={i} {...ship} />;
        })}
      </div>
    </div>
  );
};

export default Ships;
