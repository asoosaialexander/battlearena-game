import React from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import Styles from "./SelectionModal.module.css";
import PropTypes from "prop-types";

export default function SelectionModal({
  isOpen,
  selectionList,
  headingText,
  okText,
  cancelText,
  handleOkClick,
  handleCancelClick,
}) {
  const [selectedValue, setSelectedValue] = React.useState("");

  return (
    <Modal open={isOpen} onClose={handleCancelClick}>
      <Box className={Styles["modal-content"]}>
        <FormControl fullWidth>
          <InputLabel>{headingText}</InputLabel>
          <Select
            value={selectedValue}
            label={headingText}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {selectionList.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Grid gap={1} container direction={"row"} sx={{ marginTop: 1 }}>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleOkClick(selectedValue)}
            >
              {okText}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleCancelClick}>
              {cancelText}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

SelectionModal.defaultProps = {
  headingText: "Select",
  okText: "Ok",
  cancelText: "Cancel",
};

SelectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectionList: PropTypes.arrayOf(PropTypes.string).isRequired,
  headingText: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  handleOkClick: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
};
