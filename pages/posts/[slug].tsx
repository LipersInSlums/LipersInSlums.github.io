import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "zenn-markdown-html";
import { Post } from "@/model/Post";
import { PostOGP } from "@/components/common/PostOGP";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import usePageTitle from "src/hooks/usePageTitle";

type Props = {
  readonly post: Post;
};

const Post: NextPage<Props> = ({ post }) => {
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
          <article className="mb-32 znc">
            <PostOGP
              title={post.title}
              description={post.excerpt}
              type="article"
              url={`https://lipersinslums.github.io/posts/${post.slug}`}
            />
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
    "excerpt",
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
