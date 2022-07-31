import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import Head from "next/head";
import markdownToHtml from "zenn-markdown-html";
import { Post } from "@/model/Post";
import { PostOGP } from "@/components/common/PostOGP";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = {
  readonly post: Post;
};

const Post: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const htmlTitle = `${post.title} | LipersInSlums Wiki`;
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
              <title>{htmlTitle}</title>
            </Head>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </div>
  );
};

export default Post;

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
    "slug",
    "author",
    "content",
  ]) as unknown as Post;
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
