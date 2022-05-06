import { AppBar, Container, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  const AppBarStyle = {
    backgroundColor: "#fff",
    padding: "0.2rem",
    color: "black",
  };

  return (
    <div>
      <Head>
        <title>Battleship</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar sx={AppBarStyle} position="static">
        <Typography
          variant="h5"
          align="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <DirectionsBoatIcon />
          Battleship
          <DirectionsBoatIcon />
        </Typography>
      </AppBar>

      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
