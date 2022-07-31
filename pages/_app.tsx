import { useEffect, Fragment } from "react";
import type { FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "@/styles/theme";

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
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
