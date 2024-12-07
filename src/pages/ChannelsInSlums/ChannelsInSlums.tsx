import styled from "@emotion/styled";
import Link from "next/link";
import { getAllChannelInfos } from "@/lib/channels";
import usePageTitle from "src/hooks/usePageTitle";

export default function ChannelsInSlums() {
  usePageTitle("ChannelsInSlums");

  const channelInfos = getAllChannelInfos();

  return (
    <Wrap>
      <ChannelList>
        {channelInfos.map(({ description, name }) => {
          return (
            <Item key={name}>
              <Link href={`ChannelsInSlums/${name}`}>{name}</Link>
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
