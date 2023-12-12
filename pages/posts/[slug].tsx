import { useRouter } from "next/router";
import ErrorPage from "next/error";
import markdownToHtml from "zenn-markdown-html";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styled from "@emotion/styled";
import { Post, getAllPosts, getPostBySlug } from "@/lib/api";

import { PostOGP } from "@/components/common/PostOGP";
import { ParsedUrlQuery } from "querystring";
import usePageTitle from "src/hooks/usePageTitle";

type Props = {
  readonly post: Post<["content", "title", "slug", "excerpt"]>;
};

const PostPage: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  usePageTitle(post?.title);
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
          <WikiArticle className="mb-32 znc">
            <PostOGP
              title={post.title}
              description={post.excerpt}
              type="article"
              url={`https://lipersinslums.github.io/posts/${post.slug}`}
            />
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </WikiArticle>
        </>
      )}
    </div>
  );
};

export default PostPage;

type Params = ParsedUrlQuery & {
  readonly slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) {
    throw Error("getStaticPaths failed!");
  }
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "excerpt",
    "slug",
    "author",
    "content",
    "show_index",
  ]);
  const content = await markdownToHtml(post.content);

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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
};

const WikiArticle = styled.article`
  h1 {
    position: relative;
    font-size: 180%;
    color: #323220;
    padding-bottom: 0.2em;
  }

  h1:after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6px;
    background: repeating-linear-gradient(
      -45deg,
      transparent 0 4px,
      #8a8a86 4px 8px
    );
  }

  h2 {
    font-size: 150%;
    color: #323220;
    border-bottom: 2px dashed #8a8a86;
  }

  h3 {
    font-size: 120%;
    border-left: 5px solid #8a8a86;
    padding-left: 0.5em;
  }

  p {
    color: #2d2d0f;
  }
`;
