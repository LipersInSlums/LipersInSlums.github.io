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
    <Wrap>
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
    </Wrap>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const ChannelWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
