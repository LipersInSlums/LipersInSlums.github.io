import styled from "@emotion/styled";
import PostListItem from "./PostListItem";
import { Post } from "@/pages/api/posts";
import usePageTitle from "src/hooks/usePageTitle";

type Props = {
  posts: Post[];
};

export default function Index({ posts }: Props) {
  usePageTitle();
  return (
    <Wrap>
      <ListWrap>
        {posts.map((post) => (
          <PostListItem
            key={post.path}
            author={post.author.name}
            date={post.date}
            excerpt={post.excerpt}
            title={post.title}
            path={post.path}
          />
        ))}
      </ListWrap>
    </Wrap>
  );
}

const Wrap = styled.main`
  display: flex;
  flex-direction: "column";
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  article:not(:last-child) {
    border-bottom: 1px solid #666;
  }
`;
