import Head from "next/head";
import { FC } from "react";

type OGPPageType = "article" | "blog";

type Props = {
  title: string;
  type: OGPPageType;
  description: string;
  url: string;
};

const PostOGP: FC<Props> = ({ title, type, description, url }) => (
  <Head>
    <meta property="og:title" content={`${title} - LipersInSlums Wiki`} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:description" content={description} />
  </Head>
);

export default PostOGP;
