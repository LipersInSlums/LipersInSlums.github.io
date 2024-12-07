import styled from "@emotion/styled";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { ChannelInfo } from "@/model/Channel";
import usePageTitle from "src/hooks/usePageTitle";

type Props = {
  readonly channel: ChannelInfo;
};

export default function Channel({ channel }: Props) {
  const { description, name, notes, refs, since, topic } = channel;
  usePageTitle(name);
  return (
    <Wrap>
      <div>
        <Title>
          <Back href="/ChannelsInSlums/">
            <ArrowBack />
          </Back>
          <Name>{name}</Name>
          {topic ? <Topic>{topic}</Topic> : ""}
        </Title>
        <i>since: </i>
        {since}
        <br />
        {description ? `「${description}」` : ""}
      </div>
      <div>
        {notes.map((note) => {
          return <p key={note}>{note}</p>;
        })}
      </div>
      <ReferenceWrap>
        {refs.map(({ href, name }) => {
          return (
            <Reference key={name}>
              <Link href={href}>{name}</Link>
            </Reference>
          );
        })}
      </ReferenceWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 4px 16px;
`;

const Title = styled.div`
  margin-top: 0.83em;

  @media screen and (min-width: 450px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Back = styled(Link)`
  color: #333;

  @media screen and (min-width: 450px) {
    margin-right: 1em;
    margin-top: 0.2em;
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
    position: relative;
    bottom: 2px;

    @media screen and (min-width: 450px) {
      margin-left: 1em;
      margin-right: 1em;
      content: "|";
    }
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
