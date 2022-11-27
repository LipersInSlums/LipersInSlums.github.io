import styled from "@emotion/styled";
import { randomBytes } from "crypto";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

type WithNonceProps = {
  readonly nonce: string;
};

export default class MyDocument extends Document<WithNonceProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const nonce = randomBytes(128).toString("base64");

    return {
      ...initialProps,
      nonce,
    };
  }

  render() {
    const { nonce } = this.props;
    const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: 'nonce-${nonce}' 'strict-dynamic'`;

    return (
      <Html>
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <meta property="og:site_name" content="LipersInSlums Wiki" />
          <meta name="twitter:card" content="summary" />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-64x64.png"
            sizes="64x64"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-128x128.png"
            sizes="128x128"
          />
        </Head>
        <Body>
          <Main />
          <NextScript nonce={nonce} />
        </Body>
      </Html>
    );
  }
}

const Body = styled.body`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;

  background-color: #fffffc;

  * {
    box-sizing: border-box;
  }

  #__next {
    width: 100%;
    height: 100%;
  }
`;
