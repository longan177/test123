// @ts-nocheck
import { Button as ButtonFromMUI } from "@mui/material";
import { yellow } from "@mui/material/colors";
import React from "react";

type Props = {
  disabled?: boolean;
  children: React.ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
  sx: {};
};

const Button = ({ type, disabled, children, onClick, sx }: Props) => {
  return (
    <ButtonFromMUI
      onClick={onClick}
      sx={[
        {
          backgroundColor: yellow[400],
          width: "100%",
          marginBottom: "1.5rem",

          padding: ".7rem",
          color: "#000",
          "&:hover": {
            backgroundColor: yellow[600],
          },
        },
        sx,
      ]}
      variant="contained"
      type={type}
      disabled={disabled}
    >
      {children}
    </ButtonFromMUI>
  );
};

export default Button;
