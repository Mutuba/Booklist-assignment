import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface SnackbarAlertContextProps {
  showSnackbarAlert: boolean;
  setShowSnackbarAlert: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarAlertMessage: string;
  setSnackbarAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  triggerSnackbarAlert: (message: string) => void;
}

interface AlertProviderProps {
  children: ReactNode;
  value?: {
    showSnackbarAlert?: false;
    setShowSnackbarAlert?: React.Dispatch<React.SetStateAction<boolean>>;
    snackbarAlertMessage?: "";
    setSnackbarAlertMessage?: React.Dispatch<React.SetStateAction<string>>;
  };
}

const SnackbarAlertContext = createContext<SnackbarAlertContextProps | null>(
  null
);

export const useAlert = () => {
  const context = useContext(SnackbarAlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [showSnackbarAlert, setShowSnackbarAlert] = useState(false);
  const [snackbarAlertMessage, setSnackbarAlertMessage] = useState("");

  const triggerSnackbarAlert = useCallback(
    (message: string) => {
      setShowSnackbarAlert(false);
      setTimeout(() => {
        setSnackbarAlertMessage(message); // Set the new message
        setShowSnackbarAlert(true); // Show the new alert
      }, 100); // Small delay to ensure the state updates properly
    },
    [setShowSnackbarAlert, setSnackbarAlertMessage]
  );

  return (
    <SnackbarAlertContext.Provider
      value={{
        showSnackbarAlert,
        setShowSnackbarAlert,
        snackbarAlertMessage,
        setSnackbarAlertMessage,
        triggerSnackbarAlert,
      }}
    >
      {children}
    </SnackbarAlertContext.Provider>
  );
};
