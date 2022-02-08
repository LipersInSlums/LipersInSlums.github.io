import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "zenn-markdown-html";

interface Author {
  name: string;
}

interface PostType {
  slug: string;
  title: string;
  date: string;
  author: Author;
  excerpt: string;
  content: string;
}

interface Props {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
}

const Post: React.VFC<Props> = (props) => {
  const router = useRouter();
  if (!router.isFallback && !props.post?.slug) {
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
            <Head>
              <title>{props.post.title} | LipersInSlums Wiki</title>
            </Head>
            <div dangerouslySetInnerHTML={{ __html: props.post.content }} />
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
