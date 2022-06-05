import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  let navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <Item>
          <Button
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              navigate("/play");
            }}
          >
            Play
          </Button>
        </Item>
        <Item>
          <Button
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              navigate("/collection");
            }}
          >
            Collection
          </Button>
        </Item>
      </Stack>
    </Box>
  );
}
