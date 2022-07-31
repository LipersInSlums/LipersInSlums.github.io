import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import Head from "next/head";
import markdownToHtml from "zenn-markdown-html";

import { Post } from "@/model/Post";
import PostOGP from "@/components/common/PostOGP";
import { FC } from "react";

interface Props {
  post: Post;
  morePosts: Post[];
  preview?: boolean;
}

const Post: FC<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      <div />
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <article className="mb-32 znc">
            <PostOGP
              title={post.title}
              description="hpge"
              type="article"
              url="http://localhost:3000"
            />
            <Head>
              <title>{post.title} | LipersInSlums Wiki</title>
            </Head>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </div>
  );
};

export default Post;

interface Params {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
