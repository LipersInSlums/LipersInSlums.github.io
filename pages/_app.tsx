import { useEffect } from "react";
import type { FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import { PageTitleProvider } from "src/hooks/usePageTitle";
import AppLayout from "src/pages/Layout/AppLayout";

const App: FC<AppProps> = (props) => {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PageTitleProvider suffix="LipersInSlums Wiki" delimiter="|">
        <CssBaseline />
        <AppLayout {...props} />
      </PageTitleProvider>
    </ThemeProvider>
  );
};

export default App;
