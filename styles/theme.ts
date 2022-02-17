import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#95A540",
      light: "#C0C67A",
      dark: "#7A8446",
    },
    secondary: {
      main: "#404A4A",
      light: "#6F4A2A",
      dark: "#A98546",
    },
  },
});

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      common: {
        black: "#000";
        white: "#fff";
      };
      primary: {
        main: "#95A540";
        light: "#C0C67A";
        dark: "#7A8446";
      };
      secondary: {
        main: "#A98546";
        light: "#6F4A2A";
        dark: "#404A4A";
      };
    };
  }
}

export default theme;
