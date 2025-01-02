import styled from "@emotion/styled";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowBack } from "@mui/icons-material";
import usePageTitle from "src/hooks/usePageTitle";
type Props = {
  content: string;
  description?: string;
  name?: string;
  refs?: { href: string; name: string }[];
  since?: string;
  topic?: string;
};

export default function Channel({
  content,
  description,
  name,
  refs,
  since,
  topic,
}: Props) {
  usePageTitle(name);
  return (
    <ContentWrap>
      <TitleWrap>
        <Title>
          <Back href="./">
            <ArrowBack />
          </Back>
          {name ? <Name>{name}</Name> : ""}
          {topic ? <Topic>{topic}</Topic> : ""}
        </Title>
        {since ? (
          <>
            <i>since: </i>
            {format(new Date(since), "yyyy/MM/dd")}
          </>
        ) : (
          ""
        )}
        <br />
        {description ? `「${description}」` : ""}
      </TitleWrap>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <ReferenceWrap>
        {refs?.map(({ href, name }) => {
          return (
            <Reference key={name}>
              <Link target="_blank" rel="noopener noreferrer" href={href}>
                {name}
              </Link>
            </Reference>
          );
        })}
      </ReferenceWrap>
    </ContentWrap>
  );
}

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 900px) {
    min-width: inherit;
    width: 100%;
  }
`;

const TitleWrap = styled.header`
  text-align: right;

  @media screen and (max-width: 900px) {
    text-align: center;
    margin-top: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.83em;
  text-align: left;
  margin-left: 2em;
  @media screen and (max-width: 900px) {
    margin-left: 0;
  }
`;

const Name = styled.div`
  font-size: 1.5em;
  font-weight: 700;

  &:before {
    content: "#";
    color: gray;
    margin-right: 0.5em;
  }
`;

const Topic = styled.div`
  color: #444;

  &:before {
    color: gray;
    bottom: 2px;

    margin-right: 1em;
    margin-left: 5px;
    content: "|";
  }
`;

const ReferenceWrap = styled.div`
  margin-block-start: 1em;
  margin-block-end: 1em;
`;

const Reference = styled.span`
  &:first-child {
    &:before {
      content: "see here:";
      margin-right: 0.3em;
    }
  }
  &:last-child {
    &:after {
      content: "";
    }
  }
  &:after {
    content: ",";
    margin-right: 0.3em;
  }
`;

const Back = styled(Link)`
  display: none;
  color: #333;

  @media screen and (max-width: 900px) {
    display: inline-block;
    margin-right: 1em;
    margin-top: 0.2em;
  }
`;
