import Link from "@/components/atoms/Link";
import styled from "@emotion/styled";
import { dateFormat } from "src/util/dateFormat";

type Props = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  path: string;
};

export default function PostListItem({
  author,
  date,
  excerpt,
  title,
  path,
}: Props) {
  return (
    <Wrap>
      <Link href={`posts/${path}`}>
        <TitleWrap>
          <Title>{title}</Title>
          <Author>{author}</Author>
          <Date>{dateFormat(date)}</Date>
        </TitleWrap>
        <ExcerptWrap>{excerpt}</ExcerptWrap>
      </Link>
    </Wrap>
  );
}

const Wrap = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  margin-bottom: 5px;
`;

const Title = styled.h2`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: auto;
  max-width: 70%;
`;

const Author = styled.span`
  color: #1d78b3;
  &:before {
    display: inline-block;
    content: "@";
  }
  margin-right: 5px;
`;

const Date = styled.span`
  color: #666;
`;

const ExcerptWrap = styled.div`
  color: #8a8a86;
`;
