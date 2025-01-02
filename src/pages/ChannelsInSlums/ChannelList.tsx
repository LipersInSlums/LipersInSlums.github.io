import styled from "@emotion/styled";
import Link from "next/link";
import usePageTitle from "src/hooks/usePageTitle";
import { ChannelInfo } from "@/model/Channel";

type Props = {
  readonly channels: ChannelInfo[];
};

export default function ChannelList({ channels }: Props) {
  usePageTitle("ChannelsInSlums");

  return (
    <ChannelWrap>
      {channels.map(({ description, name, realPath }) => {
        return (
          <Item key={realPath}>
            <Link href={`/channels/${realPath}`}>{name}</Link>
            <Description>{description ?? ""}</Description>
          </Item>
        );
      })}
    </ChannelWrap>
  );
}

const ChannelWrap = styled.ul`
  padding: 0;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  margin: 10px 0;
  padding: 5px;
  background-color: #f8f8f8;
  &::marker {
    content: "";
  }

  a::before {
    content: "#";
    text-decoration: none;
    margin-right: 5px;
    color: gray;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Description = styled.div`
  font-size: 0.8em;
`;
