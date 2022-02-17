import { getAllPosts } from "lib/api";
import BlogPosts from "src/components/templates/BlogPosts";
import MainWindow from "../src/components/templates/MainWindow";
import { Post } from "../src/model/Post";

type Props = {
  readonly allPosts: Post[];
};

const Blog = ({ allPosts }: Props) => {
  return (
    <MainWindow>
      <BlogPosts posts={allPosts} />
    </MainWindow>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "category",
    "tag",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
