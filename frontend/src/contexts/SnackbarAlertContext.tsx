import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
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
    showSnackbarAlert?: boolean;
    setShowSnackbarAlert?: React.Dispatch<React.SetStateAction<boolean>>;
    snackbarAlertMessage?: string;
    triggerSnackbarAlert?: (message: string) => void;
  };
}

const SnackbarAlertContext = createContext<SnackbarAlertContextProps | null>(
  null
);

export const useSnackbarAlert = () => {
  const context = useContext(SnackbarAlertContext);
  if (!context) {
    throw new Error(
      "useSnackbarAlert must be used within a SnackbarAlertProvider"
    );
  }
  return context;
};

export const SnackbarAlertProvider: React.FC<SnackbarAlertProviderProps> = ({
  children,
  value,
}) => {
  const [internalShowSnackbarAlert, setShowSnackbarAlertState] =
    useState<boolean>(value?.showSnackbarAlert ?? false);
  const [internalSnackbarAlertMessage, setSnackbarAlertMessageState] =
    useState<string>(value?.snackbarAlertMessage ?? "");

  const setShowSnackbarAlert =
    value?.setShowSnackbarAlert ?? setShowSnackbarAlertState;

  const triggerSnackbarAlert =
    value?.triggerSnackbarAlert ??
    useCallback(
      (message: string) => {
        setShowSnackbarAlert(false);
        setTimeout(() => {
          setSnackbarAlertMessageState(message);
          setShowSnackbarAlert(true);
        }, 100); // Small delay to ensure the state updates properly
      },
      [setShowSnackbarAlert]
    );

  const contextValue = useMemo(
    () => ({
      showSnackbarAlert: internalShowSnackbarAlert,
      setShowSnackbarAlert,
      snackbarAlertMessage: internalSnackbarAlertMessage,
      triggerSnackbarAlert,
    }),
    [
      internalShowSnackbarAlert,
      setShowSnackbarAlert,
      internalSnackbarAlertMessage,
      triggerSnackbarAlert,
    ]
  );

  return (
    <SnackbarAlertContext.Provider value={contextValue}>
      {children}
    </SnackbarAlertContext.Provider>
  );
};
