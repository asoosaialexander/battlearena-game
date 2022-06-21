import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Styles from "./SelectionModal.module.css";

export default function AlertModal({ isOpen, alertText, handleOkClick }) {
  return (
    <Modal open={isOpen} onClose={handleOkClick}>
      <Box className={Styles["modal-content"]}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {alertText}
        </Typography>
        <Button variant="outlined" onClick={handleOkClick}>
          Ok
        </Button>
      </Box>
    </Modal>
  );
}
