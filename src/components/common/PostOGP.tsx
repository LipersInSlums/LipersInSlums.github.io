import Head from "next/head";
import type { FC } from "react";

type OGPPageType = "article" | "blog";

type Props = {
  readonly title: string;
  readonly type: OGPPageType;
  readonly description: string;
  readonly url: string;
};

export const PostOGP: FC<Props> = ({ description, title, type, url }) => (
  <Head>
    <meta property="og:title" content={`${title} - LipersInSlums Wiki`} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:description" content={description} />
  </Head>
);
