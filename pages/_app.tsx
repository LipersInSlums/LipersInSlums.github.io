import { useEffect } from "react";
import type { FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Copyright } from "@/components/templates/materials";
import { PageTitleProvider } from "src/hooks/usePageTitle";

const App: FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PageTitleProvider suffix="LipersInSlums Wiki" delimiter="|">
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              LipersInSlums Wiki
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Component {...pageProps} />
              <Copyright />
            </Box>
          </Box>
        </Container>
      </PageTitleProvider>
    </ThemeProvider>
  );
};

export default App;
