import IndexPage from "src/pages/Index";
import { fetchAllPosts } from "./api/posts";

type Props = Awaited<ReturnType<typeof getStaticProps>>["props"];

const Index = ({ posts }: Props) => {
  return <IndexPage posts={posts} />;
};

export default Index;

export const getStaticProps = async () => {
  const posts = await fetchAllPosts();
  return {
    props: { posts },
  };
};
