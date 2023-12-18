import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  items: {
    content: string;
    level: number;
  }[];
  highlightIndex: number;
};

export default function HeadingList({ highlightIndex, items, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = containerRef.current?.querySelector?.(
      `#index_${highlightIndex}`,
    );
    if (target) {
      const top = (target as HTMLElement).offsetTop - 200;
      containerRef.current?.scrollTo?.({
        top: top > 0 ? top : 0,
      });
    }
  }, [highlightIndex, items]);

  return (
    <Container ref={containerRef}>
      <Title>{title}</Title>
      {items.map((item, index) => {
        const Heading = headings[item.level - 1];
        const isHighlighted =
          highlightIndex > index ? "highlighted" : undefined;
        return (
          <Heading
            id={`index_${index}`}
            className={`${isHighlighted ?? ""}`}
            href={`#${encodeURIComponent(
              item.content.replace(/\s/g, "-").toLowerCase(),
            )}`}
            key={`${index}_${isHighlighted}`}
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
  max-height: 70vh;
  overflow-y: scroll;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const inactiveColor = "#333";

const weightAnim = css`
  @keyframes weight {
    from {
      font-weight: 100;
    }
    to {
      font-weight: 900;
    }
  }
`;

const headingStyle = css`
  ${weightAnim}
  display: inline-block;
  color: ${inactiveColor};
  text-decoration: none;
  font-weight: 100;

  &:visited {
    color: ${inactiveColor};
  }
  &:active {
    color: ${inactiveColor};
  }
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  &.highlighted {
    color: #336;
    /* cubic-bezier(0.22, 1, 0.36, 1) => easeOutQuint */
    animation: 0.5s weight cubic-bezier(0.22, 1, 0.36, 1) forwards;
    &:visited {
      color: #336;
    }
    &:active {
      color: #336;
    }
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
