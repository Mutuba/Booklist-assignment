import React from "react";
import { Container, Typography } from "@mui/material";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Container maxWidth="md" style={{ marginTop: "6rem" }}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">{message}</Alert>
      </Stack>
    </Container>
  );
};

export default Error;
