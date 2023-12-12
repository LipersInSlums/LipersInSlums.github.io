import { css } from "@emotion/react";
import styled from "@emotion/styled";

type Props = {
  title: string;
  items: {
    content: string;
    level: number;
  }[];
};

export default function HeadingList({ items, title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      {items.map((item, index) => {
        const Heading = headings[item.level - 1];
        return (
          <Heading
            href={`#${encodeURIComponent(
              item.content.replace(/\s/g, "-").toLowerCase(),
            )}`}
            key={index}
          >
            {item.content}
          </Heading>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 8px;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const headingStyle = css`
  color: #333;
  text-decoration: none;
  &:visited {
    color: #333;
  }
  &:active {
    color: #333;
  }
  cursor: pointer;
  :hover {
    &:visited {
      color: #333;
    }
    &:active {
      color: #333;
    }
    text-decoration: underline;
  }
`;

const H1 = styled.a`
  font-weight: bolder;
  font-size: 1rem;
  margin-left: 0.75rem;
  ${headingStyle}
`;

const H2 = styled.a`
  font-weight: bolder;
  font-size: 0.9rem;
  margin-left: 1.5rem;
  ${headingStyle}
`;

const H3 = styled.a`
  font-size: 0.75rem;
  margin-left: 2rem;
  ${headingStyle}
`;

const headings = [H1, H2, H3];
