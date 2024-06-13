import React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import { useAlert } from "../../contexts/SnackbarAlertContext";

const SnackbarAlert: React.FC = () => {
  const { showSnackbarAlert, setShowSnackbarAlert, snackbarAlertMessage } =
    useAlert();

  const handleClose = () => {
    setShowSnackbarAlert(false);
  };

  return (
    <Snackbar
      open={showSnackbarAlert}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert icon={<CheckIcon />} onClose={handleClose}>
        {snackbarAlertMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
