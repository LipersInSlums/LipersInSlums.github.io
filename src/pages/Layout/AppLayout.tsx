import type { AppProps } from "next/app";
import Link from "next/link";
import styled from "@emotion/styled";
import { Container } from "@mui/material";

import { Copyright } from "@/components/templates/materials";
import LisperInSlumsLogo from "@/components/atoms/LisperInSlumsLogo.svg";

type Menu = {
  href: string;
  label: string;
};

type Props = {
  menus: Menu[];
} & AppProps<object>;

export default function AppLayout({ Component, menus, pageProps }: Props) {
  return (
    <PageWrap>
      <HeaderWrap>
        <LogoWrap>
          <Link href="/">
            <LisperInSlumsLogo aria-label="LipersInSlums Wiki" width="100%" />
          </Link>
        </LogoWrap>
      </HeaderWrap>
      <MenuWrap>
        {menus.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </MenuWrap>
      <AppWrap maxWidth="xl">
        <ComponentWrap>
          <Component {...pageProps} />
        </ComponentWrap>
      </AppWrap>
      <FooterWrap>
        <Copyright />
      </FooterWrap>
    </PageWrap>
  );
}

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
  padding: 10px 24px 0px;
  width: 100%;
`;

const LogoWrap = styled.div`
  max-width: 800px;
  min-width: 150px;
`;

const MenuWrap = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  gap: 10%;
  width: 100%;
  padding: 8px 16px;
  border-radius: 0 0 12px 12px;
  box-shadow: 0px 5px 4px #ccc;

  a {
    color: #000;
    transition: color 0.3s;

    &:visited {
      color: #000;
    }

    &:hover {
      color: #8a8a86;
    }
  }

  a:before {
    content: "|";
    display: inline;
    margin-right: 5px;
    width: 4px;
    height: 2px;
    background: #000;
  }
`;

const AppWrap = styled(Container)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
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

const ComponentWrap = styled.main``;
