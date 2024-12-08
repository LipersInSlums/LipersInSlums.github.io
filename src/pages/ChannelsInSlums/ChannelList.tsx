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
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  &::marker {
    content: "";
  }

  a::before {
    content: "#";
    text-decoration: none;
    margin-right: 5px;
    color: gray;
  }
`;

const Description = styled.div`
  font-size: 0.8em;
  margin-left: 15px;
`;
