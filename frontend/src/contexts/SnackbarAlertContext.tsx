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
  triggerSnackbarAlert: (message: string) => void;
}

interface SnackbarAlertProviderProps {
  children: ReactNode;
  value?: {
    showSnackbarAlert?: false;
    setShowSnackbarAlert?: React.Dispatch<React.SetStateAction<boolean>>;
    snackbarAlertMessage?: "";
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

export const AlertProvider: React.FC<SnackbarAlertProviderProps> = ({
  children,
}) => {
  const [showSnackbarAlert, setShowSnackbarAlert] = useState(false);
  const [snackbarAlertMessage, setSnackbarAlertMessage] = useState("");

  const triggerSnackbarAlert = useCallback(
    (message: string) => {
      setShowSnackbarAlert(false);
      setTimeout(() => {
        setSnackbarAlertMessage(message);
        setShowSnackbarAlert(true);
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
        triggerSnackbarAlert,
      }}
    >
      {children}
    </SnackbarAlertContext.Provider>
  );
};
