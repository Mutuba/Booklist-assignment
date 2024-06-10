// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Mulish", sans-serif',
  },
  palette: {
    primary: {
      main: "#5ACCCC", // Example primary color
    },
    secondary: {
      main: "#5ACCCC", // Example secondary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-primary": {
            backgroundColor: "#5ACCCC", // Primary color for main buttons
            color: "#fff",
          },
          "&.MuiButton-secondary": {
            backgroundColor: "#53C2C2", // Secondary color for secondary buttons
            color: "#fff",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: "#5ACCCC", // Primary color for main headings
        },
        h2: {
          color: "#5ACCCC", // Primary color for main headings
        },
        body1: {
          color: "#5ACCCC", // Secondary color for less important text
        },
      },
    },
  },
});

export default theme;
