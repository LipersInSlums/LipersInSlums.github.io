import { Post } from "@/pages/api/posts";
import styled from "@emotion/styled";
import usePageTitle from "src/hooks/usePageTitle";
import PostListItem from "./PostListItem";

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
            path={post.path}
            title={post.title}
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
