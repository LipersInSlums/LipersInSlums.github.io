import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "../styles/theme";
import initTwitterScriptInner from "zenn-embed-elements/lib/init-twitter-script-inner";
import { useEffect } from "react";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>LipersInSlums Wiki</title>
        <link href="/favicon.ico" rel="icon" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <script
          dangerouslySetInnerHTML={{
            __html: initTwitterScriptInner,
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
