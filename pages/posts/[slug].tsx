import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import markdownToHtml from "zenn-markdown-html";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styled from "@emotion/styled";
import { getAllPosts, getPostBySlug } from "@/lib/api";

import { PostOGP } from "@/components/common/PostOGP";

import usePageTitle from "src/hooks/usePageTitle";
import { Post } from "@/model/Post";
import HeadingList from "@/components/common/HeadingList";

type Props = {
  readonly post: Post;
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
        // 目次が非表示のときは display を block にしないと変に右寄りになる
        <Container style={{ display: post.show_index ? "grid" : "block" }}>
          {post.show_index && (
            <HeadingContainer className="heading-container">
              <HeadingList
                title="目次"
                items={post.headings.map((head) => ({
                  level: head.level,
                  content: head.content,
                }))}
              />
            </HeadingContainer>
          )}
          <WikiArticle className="mb-32 znc">
            <PostOGP
              title={post.title}
              description={post.excerpt}
              type="article"
              url={`https://lipersinslums.github.io/posts/${post.slug}`}
            />

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </WikiArticle>
        </Container>
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
  const post = getPostBySlug(params.slug);

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
  const posts = getAllPosts();

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

const Container = styled.main`
  display: grid;
  grid-template-columns: 0.85fr 3fr;
  column-gap: 10px;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const HeadingContainer = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

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
