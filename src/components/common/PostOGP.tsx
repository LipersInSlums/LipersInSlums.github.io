import Head from "next/head";
import * as React from "react";

type OGPPageType = "article" | "blog";

type Props = {
  readonly title: string;
  readonly type: OGPPageType;
  readonly description: string;
  readonly url: string;
};

export const PostOGP: React.FC<Props> = ({ title, type, description, url }) => (
  <Head>
    <meta property="og:title" content={`${title} - LipersInSlums Wiki`} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:description" content={description} />
  </Head>
);
