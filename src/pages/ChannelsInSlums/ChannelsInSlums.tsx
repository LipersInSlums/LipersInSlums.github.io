import styled from "@emotion/styled";
import Link from "next/link";
import { getAllChannelNames } from "@/lib/channels";

export default function ChannelsInSlums() {
  const channelNames = getAllChannelNames();
  return (
    <Wrap>
      <ChannelList>
        {channelNames.map((name) => {
          return (
            <Item key={name}>
              <Link href={`channelsinslums/${name}`}>{name}</Link>
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
