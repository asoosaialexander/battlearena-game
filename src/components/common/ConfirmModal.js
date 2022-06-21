import React from "react";
import {
  Button,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Styles from "./SelectionModal.module.css";

export default function ConfirmModal({ isOpen, confirmText, handleConfirmClick, handleCancelClick }) {
  return (
    <Modal open={isOpen} onClose={handleCancelClick}>
      <Box className={Styles["modal-content"]}>
        <Typography variant="h6">{confirmText}</Typography>
        <Grid gap={1} container direction={"row"} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button variant="outlined" onClick={handleConfirmClick}>
              Confirm
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
