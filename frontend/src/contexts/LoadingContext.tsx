import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadingProviderProps {
  children: ReactNode;
  value?: {
    isLoading?: false;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
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
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
