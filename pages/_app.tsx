import { useEffect } from "react";
import type { FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import Container from "@mui/material/Container";
import { Copyright } from "@/components/templates/materials";
import { PageTitleProvider } from "src/hooks/usePageTitle";
import LisperInSlumsLogo from "@/components/atoms/LisperInSlumsLogo.svg";

import styled from "@emotion/styled";
import Link from "next/link";

const App: FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PageTitleProvider suffix="LipersInSlums Wiki" delimiter="|">
        <CssBaseline />
        <PageWrap>
          <HeaderWrap>
            <LogoWrap>
              <Link href="/">
                <LisperInSlumsLogo
                  aria-label="LipersInSlums Wiki"
                  width="100%"
                />
              </Link>
            </LogoWrap>
          </HeaderWrap>
          <AppWrap maxWidth="sm">
            <Component {...pageProps} />
          </AppWrap>
          <FooterWrap>
            <Copyright />
          </FooterWrap>
        </PageWrap>
      </PageTitleProvider>
    </ThemeProvider>
  );
};

export default App;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  min-width: 320px;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 14px 24px;
  width: 100%;
`;

const LogoWrap = styled.div`
  max-width: 800px;
  min-width: 150px;
`;

const AppWrap = styled(Container)`
  padding: 4px 16px;
  flex: 1;
`;

const FooterWrap = styled.div`
  background-color: #fefefe;
  width: 100%;
  margin-top: auto;
  padding: 10px 0;
  &::before {
    content: "";
    display: block;
    margin-bottom: 8px;
    border-radius: 28px;
    box-shadow: 0px 5px 4px #ccc;
    width: 100%;
    height: 28px;
    background-color: #fffffc;
  }
`;
