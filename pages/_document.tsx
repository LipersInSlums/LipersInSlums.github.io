import { randomBytes } from "crypto";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React from "react";

type WithNonceProp = {
  nonce: string;
};

export default class MyDocument extends Document<WithNonceProp> {
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
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}
