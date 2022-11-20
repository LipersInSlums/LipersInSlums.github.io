import { useEffect, Fragment } from "react";
import type { FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "@/styles/theme";
import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Copyright } from "@/components/templates/materials";

const App: FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <Fragment>
      <Head>
        <link href="/favicon.ico" rel="icon" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
