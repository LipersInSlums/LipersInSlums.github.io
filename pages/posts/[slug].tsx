import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import markdownToHtml from "zenn-markdown-html";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import { getAllPosts, getPostBySlug } from "@/lib/api";

import { PostOGP } from "@/components/common/PostOGP";

import usePageTitle from "src/hooks/usePageTitle";
import { Post } from "@/model/Post";
import HeadingList from "@/components/common/HeadingList";
import useLastOnScreen from "src/hooks/useLastOnScreen";

type Props = {
  readonly post: Post;
};

const PostPage: NextPage<Props> = ({ post }) => {
  const router = useRouter();

  const [lastOnScreen, setLastOnScreen] = useState<HTMLElement | null>(null);

  const { targetRef } = useLastOnScreen<HTMLDivElement>("h1,h2,h3", (ent) =>
    setLastOnScreen(ent.target as HTMLElement),
  );

  const scolledIndex = useMemo(
    () =>
      post.headings.findIndex(
        (v) => v.content.trim() === lastOnScreen?.textContent?.trim(),
      ),
    [lastOnScreen?.textContent, post.headings],
  );

  usePageTitle(post?.title);
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <Container>
          {post.show_index && (
            <HeadingContainer className="heading-container">
              <HeadingHolder>
                <HeadingList
                  title="目次"
                  items={post.headings.map((head) => ({
                    level: head.level,
                    content: head.content,
                  }))}
                  highlightIndex={scolledIndex}
                />
              </HeadingHolder>
            </HeadingContainer>
          )}
          <WikiArticle className="mb-32 znc">
            <PostOGP
              title={post.title}
              description={post.excerpt}
              type="article"
              url={`https://lipersinslums.github.io/posts/${post.slug}`}
            />

            <div
              ref={targetRef}
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
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
    grid-template-columns: none;
    column-gap: inherit;
  }
`;

const HeadingContainer = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HeadingHolder = styled.div`
  position: sticky;
  top: 30px;

  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
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
