import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./index.css";
import { ReadingListProvider } from "./contexts/ReadingListContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { AlertProvider } from "./contexts/SnackbarAlertContext";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

import * as React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <ReadingListProvider>
            <LoadingProvider>
              <AlertProvider>
                <App />
              </AlertProvider>
            </LoadingProvider>
          </ReadingListProvider>
        </React.StrictMode>
      </ThemeProvider>
    </ApolloProvider>
  );
} else {
  console.log(`rootElement not found`);
}
