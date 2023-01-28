import React from "react";
import { useSelector } from "react-redux";
import { Box, Modal, Dialog } from "@mui/material";

export default function DialogWrapper({ children, maxWidth, fullScreen }) {
  const { show } = useSelector((state) => state.dialogs);
  return (
    <Dialog
      open={show}
      keepMounted
      maxWidth={maxWidth}
      fullWidth={true}
      fullScreen={fullScreen}
    >
      {children}
    </Dialog>
  );
}
