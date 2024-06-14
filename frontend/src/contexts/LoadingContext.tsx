import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";

interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface LoadingProviderProps {
  children: ReactNode;
  value?: {
    isLoading?: boolean;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
  };
}

const LoadingContext = createContext<LoadingContextProps | null>(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  value,
}) => {
  const [internalIsLoading, setInternalIsLoading] = useState<boolean>(
    value?.isLoading ?? false
  );

  const setIsLoading = value?.setIsLoading ?? setInternalIsLoading;

  // tracking internal value internalIsLoading and setIsLoading the state setter
  const contextValue = useMemo(
    () => ({
      isLoading: internalIsLoading,
      setIsLoading,
    }),
    [internalIsLoading, setIsLoading]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};
