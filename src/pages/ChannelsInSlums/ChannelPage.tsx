import styled from "@emotion/styled";
import Link from "next/link";
import { ChannelInfo } from "@/model/Channel";

type Props = {
  readonly channel: ChannelInfo;
};

export default function Channel({ channel }: Props) {
  return (
    <Wrap>
      <div>
        <Title>
          <Name>{channel.name}</Name>
          <Topic>{channel.topic}</Topic>
        </Title>
        <i>since: </i>
        {channel.since}
        <br />「{channel.description}」
      </div>
      <div>
        {channel.notes.map((note) => {
          return <p key={note}>{note}</p>;
        })}
      </div>
      <div>
        {channel.refs.map(({ href, name }) => {
          return (
            <Reference key={name}>
              <Link href={href}>{name}</Link>
            </Reference>
          );
        })}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Title = styled.div`
  margin-top: 0.83em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.span`
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
  width: 50%;
  white-space: nowrap;
  overflow: hidden;

  &:before {
    content: "|";
    color: gray;
    margin-left: 1em;
    margin-right: 1em;
    position: relative;
    bottom: 2px;
  }
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
