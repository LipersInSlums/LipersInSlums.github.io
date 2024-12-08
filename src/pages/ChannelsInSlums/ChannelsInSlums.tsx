import styled from "@emotion/styled";
import Link from "next/link";
import usePageTitle from "src/hooks/usePageTitle";
import { ChannelInfo } from "@/model/Channel";

type Props = {
  readonly channels: ChannelInfo[];
};

export default function ChannelsInSlums({ channels }: Props) {
  usePageTitle("ChannelsInSlums");

  return (
    <Wrap>
      <ChannelList>
        {channels.map(({ description, name, realPath }) => {
          return (
            <Item key={name}>
              <Link href={`channels/${realPath}`}>{name}</Link>
              {description ? `: ${description}` : ""}
            </Item>
          );
        })}
      </ChannelList>
    </Wrap>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
`;

const ChannelList = styled.ul`
  padding: 0;
`;

const Item = styled.li`
  &::marker {
    content: "# ";
    color: gray;
  }
`;
