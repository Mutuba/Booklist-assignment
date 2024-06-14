// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Mulish", sans-serif',
    h1: {
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:960px)": {
        fontSize: "3rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "3.5rem",
      },
      "@media (min-width:1920px)": {
        fontSize: "4rem",
      },
    },
    h2: {
      fontSize: "1.75rem",
      "@media (min-width:600px)": {
        fontSize: "2.25rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2.75rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "3.25rem",
      },
      "@media (min-width:1920px)": {
        fontSize: "3.75rem",
      },
    },
  },
  palette: {
    primary: {
      main: "#5ACCCC",
    },
    secondary: {
      main: "#5ACCCC",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-primary": {
            backgroundColor: "#5ACCCC",
            color: "#fff",
          },
          "&.MuiButton-secondary": {
            backgroundColor: "#53C2C2",
            color: "#fff",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: "#5ACCCC",
        },
        h2: {
          color: "#5ACCCC",
        },
        h3: {
          color: "#5ACCCC",
        },
        body1: {
          color: "#5ACCCC",
        },
      },
    },
  },
});

export default theme;
