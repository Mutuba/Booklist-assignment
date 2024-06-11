import React, { useEffect, Dispatch, SetStateAction } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface CustomAlertProps {
  message: string;
  severity: AlertColor;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  severity,
  setShowAlert,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Alert
      icon={<CheckIcon fontSize="inherit" />}
      severity={severity}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setShowAlert(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {message}
    </Alert>
  );
};

export default CustomAlert;
