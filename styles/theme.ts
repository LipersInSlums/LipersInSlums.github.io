import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#95A540',
      light: '#C0C67A',
      dark: '#7A8446',
    },
    secondary: {
      main: '#A98546',
      light: '#6F4A2A',
      dark: '#404A4A',
    },
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: {
        main: '#95A540',
        light: '#C0C67A',
        dark: '#7A8446',
      },
      secondary: {
        main: '#A98546',
        light: '#6F4A2A',
        dark: '#404A4A',
      },
    },
  }
}

export default theme;
