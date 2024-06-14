import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";

interface SnackbarAlertContextProps {
  showSnackbarAlert: boolean;
  setShowSnackbarAlert: Dispatch<SetStateAction<boolean>>;
  snackbarAlertMessage: string;
  triggerSnackbarAlert: (message: string) => void;
}

interface SnackbarAlertProviderProps {
  children: ReactNode;
  value?: {
    showSnackbarAlert?: boolean;
    setShowSnackbarAlert?: Dispatch<SetStateAction<boolean>>;
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
  const [internalShowSnackbarAlert, setInternalShowSnackbarAlert] =
    useState<boolean>(value?.showSnackbarAlert ?? false);

  const [internalSnackbarAlertMessage, setInternalSnackbarAlertMessage] =
    useState<string>(value?.snackbarAlertMessage ?? "");

  const setShowSnackbarAlert =
    value?.setShowSnackbarAlert ?? setInternalShowSnackbarAlert;

  // function is memoized and only reccreated if setShowSnackbarAlert changed
  const triggerSnackbarAlert =
    value?.triggerSnackbarAlert ??
    useCallback(
      (message: string) => {
        setShowSnackbarAlert(false);
        setTimeout(() => {
          setInternalSnackbarAlertMessage(message);
          setShowSnackbarAlert(true);
        }, 100); // Small delay to ensure the state updates properly
      },
      [setShowSnackbarAlert]
    );

  /*
    By using useMemo, we ensure that contextValue remains stable across renders,
    only changing when the actual data it depends on changes, thus improving the performance and efficiency
    of components using this context.
  */
  const contextValue = useMemo(
    () => ({
      showSnackbarAlert: internalShowSnackbarAlert,
      setShowSnackbarAlert,
      snackbarAlertMessage: internalSnackbarAlertMessage,
      triggerSnackbarAlert,
    }),
    [
      internalShowSnackbarAlert, // Dependency: context value changes when internalShowSnackbarAlert changes
      setShowSnackbarAlert, // Dependency: context value changes when setShowSnackbarAlert changes
      internalSnackbarAlertMessage, // Dependency: context value changes when internalSnackbarAlertMessage changes
      triggerSnackbarAlert, // Dependency: context value changes when triggerSnackbarAlert changes
    ]
  );

  return (
    <SnackbarAlertContext.Provider value={contextValue}>
      {children}
    </SnackbarAlertContext.Provider>
  );
};
