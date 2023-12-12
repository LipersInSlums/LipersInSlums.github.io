import { getAllPosts } from "./api/posts";
import IndexPage from "src/pages/Index";

type Props = Awaited<ReturnType<typeof getStaticProps>>["props"];

const Index = ({ posts }: Props) => {
  return <IndexPage posts={posts} />;
};

export default Index;

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: { posts },
  };
};
